import dataSource from "../db/data-source.db";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import Address from "../entity/address.entity";
import Department from "../entity/department.entity";
import Employee from "../entity/employee.entity";
import EmployeeDepartment from "../entity/employeeDepartment.entity";
import HttpException from "../exceptions/http.exceptions";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeDepartmentRepository from "../repository/employeeDepartment.repository";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DepartmentService from "./department.service";
import EmployeeDepartmentService from "./employeeDepartment.service";

class EmployeeService {
    private employeeDepartmentService: EmployeeDepartmentService;
    constructor(private employeeRespository: EmployeeRepository, private departmentService: DepartmentService) {
        this.employeeDepartmentService = new EmployeeDepartmentService(
            new EmployeeDepartmentRepository(dataSource.getRepository(EmployeeDepartment))
        );
    }

    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRespository.find();
    };

    getEmployeeById = async (id: number): Promise<Employee | null> => {
        return this.employeeRespository.findOneBy({ id });
    };

    createEmployee = async (employee: CreateEmployeeDto): Promise<Employee> => {
        const { name, email, address, age, departmentId, password, role } = employee;
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
        newEmployee.role = role;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;

        const department = await this.departmentService.getDepartmentById(departmentId);
        if (!department) {
            throw new HttpException(404, `No department found with id : ${departmentId}`);
        }
        await this.employeeRespository.save(newEmployee);
        const employeeDepartment = new EmployeeDepartment();
        employeeDepartment.department = department;
        employeeDepartment.employee = newEmployee;
        await this.employeeDepartmentService.saveEmployeeDepartment(employeeDepartment);
        return newEmployee;
    };

    updateEmployee = async (id: number, employee: UpdateEmployeeDto) => {
        const employeeToUpdate = await this.getEmployeeById(id);
        if (!employeeToUpdate) {
            throw new HttpException(404, `No employee found with id :${id}`);
        }
        employeeToUpdate.name = employee.name;
        employeeToUpdate.email = employee.email;
        employeeToUpdate.age = employee.age;
        if (employee.address) {
            employeeToUpdate.address.line1 = employee.address.line1;
            employeeToUpdate.address.pincode = employee.address.pincode;
        }
        await this.employeeRespository.save(employeeToUpdate);
        if (employee.departmentId) {
            const department = await this.departmentService.getDepartmentById(employee.departmentId);
            if (!department) {
                throw new HttpException(404, `No department found with id :${employee.departmentId}`);
            }
            const employeeDepartment = await this.employeeDepartmentService.findEmployeeDepartment({ employee_id: id });

            if (employeeDepartment.department_id == employee.departmentId) {
                throw new HttpException(400, `Employee is already assigned to this department`);
            }

            // updating the end date of the current employee department
            employeeDepartment.endDate = new Date();
            await this.employeeDepartmentService.saveEmployeeDepartment(employeeDepartment);

            // creating new employee department
            const newEmployeeDepartment = new EmployeeDepartment();
            newEmployeeDepartment.department = department;
            newEmployeeDepartment.employee = employeeToUpdate;
            await this.employeeDepartmentService.saveEmployeeDepartment(newEmployeeDepartment);
        }
        return employeeToUpdate;
    };

    deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.getEmployeeById(id);
        return this.employeeRespository.softDelete(employee);
    };

    loginEmployee = async (email: string, password: string) => {
        const employee = await this.employeeRespository.findOneBy({ email });
        if (!employee) throw new HttpException(404, `No employee found with email :${email}`);
        const result = await bcrypt.compare(password, employee.password);
        if (!result) throw new HttpException(401, "Invalid Credentials");
        const payload: jwtPayload = {
            name: employee.name,
            email: employee.email,
            role: employee.role,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_VALIDITY });
        return { token };
    };
}

export default EmployeeService;
