import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import bcrypt from "bcryptjs";
import { jwtPayload } from "../utils/jwtPayload.type";
import jwt from "jsonwebtoken";
import DepartmentService from "./department.service";

class EmployeeService {
    constructor(private employeeRespository: EmployeeRepository, private departmentService: DepartmentService) {}

    getMe = async (name: string, email: string): Promise<Employee> => {
        return this.employeeRespository.findOneBy({
            name,
            email,
        });
    };

    resetPassword = async (employee: Employee, currentPassword: string, newPassword: string) => {
        const result = await bcrypt.compare(currentPassword, employee.password);
        if (!result) throw new HttpException(401, "Invalid Credentials");
        employee.password = await bcrypt.hash(newPassword, 10);
        await this.employeeRespository.save(employee);
    };

    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRespository.find();
    };

    getEmployeeById = async (id: number): Promise<any> => {
        const employee = await this.employeeRespository.findOneBy({ id });
        return employee;
    };

    createEmployee = async (employee: CreateEmployeeDto): Promise<Employee> => {
        const { name, email, address, age, departmentName, password, role, status, experience } = employee;
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
        newEmployee.role = role;
        newEmployee.status = status;
        newEmployee.experience = experience;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;

        const department = await this.departmentService.getDepartmentByName(departmentName);
        if (!department) {
            throw new HttpException(404, `No department found with name : ${departmentName}`);
        }

        newEmployee.department = department;
        await this.employeeRespository.save(newEmployee);
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
        employeeToUpdate.role = employee.role;
        employeeToUpdate.status = employee.status;
        employeeToUpdate.experience = employee.experience;
        employeeToUpdate.department = await this.departmentService.getDepartmentByName(employee.departmentName);
        if (employee.address) {
            employeeToUpdate.address.line1 = employee.address.line1;
            employeeToUpdate.address.pincode = employee.address.pincode;
        }
        await this.employeeRespository.save(employeeToUpdate);

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
        return token;
    };
}

export default EmployeeService;
