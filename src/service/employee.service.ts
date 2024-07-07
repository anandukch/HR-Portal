import dataSource from "../db/data-source.db";
import { CreateEmployeeDto } from "../dto/employee.dto";
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

class EmployeeService {
    private departmentRepository: DepartmentRepository;
    private employeeDepartmentRepository: EmployeeDepartmentRepository;
    constructor(private employeeRespository: EmployeeRepository) {
        this.departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        this.employeeDepartmentRepository = new EmployeeDepartmentRepository();
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

        const department = await this.departmentRepository.findOneBy({ id: departmentId });
        if (!department) {
            throw new HttpException(404, `No department found with id :${departmentId}`);
        }
        await this.employeeRespository.save(newEmployee)
        const employeeDepartment = new EmployeeDepartment();
        employeeDepartment.department = department;
        employeeDepartment.employee = newEmployee;

        await this.employeeDepartmentRepository.create(employeeDepartment);

        return newEmployee;
    };

    updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
        const employeeToUpdate = await this.getEmployeeById(id);
        if (!employeeToUpdate) {
            throw new HttpException(404, `No employee found with id :${id}`);
        }

        employeeToUpdate.name = employee.name;
        employeeToUpdate.email = employee.email;
        employeeToUpdate.age = employee.age;
        employeeToUpdate.address.line1 = employee.address.line1;
        employeeToUpdate.address.pincode = employee.address.pincode;
        return this.employeeRespository.save(employeeToUpdate);
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
