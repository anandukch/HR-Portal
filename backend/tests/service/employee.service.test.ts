import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";
import DepartmentService from "../../src/service/department.service";
import { Role } from "../../src/utils/role.enum";
import { UpdateEmployeeDto } from "../../src/dto/employee.dto";
import DepartmentRepository from "../../src/repository/department.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../../src/utils/constants";
import Address from "../../src/entity/address.entity";
import Department from "../../src/entity/department.entity";
import EmployeeDepartmentService from "../../src/service/employeeDepartment.service";
import EmployeeDepartmentRepository from "../../src/repository/employeeDepartment.repository";
import EmployeeDepartment from "../../src/entity/employeeDepartment.entity";

describe("Employee service", () => {
    let employeeRepository: EmployeeRepository;
    let employeeService: EmployeeService;
    let departmentService: DepartmentService;
    let employeeDepartmentService: EmployeeDepartmentService;

    let employeeData: Employee = new Employee();
    employeeData.id = 1;
    employeeData.name = "test";
    employeeData.email = "test@gmail.com";
    employeeData.age = 25;
    employeeData.role = Role.HR;

    let empAdress: Address = new Address();
    empAdress.line1 = "test";
    empAdress.pincode = "123456";

    employeeData.address = empAdress;

    let empDept: EmployeeDepartment = new EmployeeDepartment();
    empDept.employee = employeeData;
    empDept.department = { id: 1, name: "test" } as Department;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;

        departmentService = new DepartmentService(new DepartmentRepository(dataSource.getRepository(Department))) as jest.Mocked<DepartmentService>;

        employeeDepartmentService = new EmployeeDepartmentService(
            new EmployeeDepartmentRepository(dataSource.getRepository(EmployeeDepartment))
        ) as jest.Mocked<EmployeeDepartmentService>;

        employeeService = new EmployeeService(employeeRepository, departmentService, employeeDepartmentService);
    });

    it("should return all employees", async () => {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([employeeData]);
        employeeRepository.find = mock;
        const users = await employeeService.getAllEmployees();
        expect(users).toEqual([employeeData]);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should return an employees with the given id", async () => {
        const mock = jest.fn();
        when(mock).calledWith({ id: 1 }).mockResolvedValue(employeeData);
        employeeRepository.findOneBy = mock;
        const user = await employeeService.getEmployeeById(1);
        expect(user!.name).toEqual("test");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("show throw exception", async () => {
        const mock = jest.fn();
        when(mock).mockResolvedValue(null);
        employeeRepository.findOneBy = mock;
        // await expect(employeeRepository.findOneBy())
    });

    it("should create an employee", async () => {
        const mockBcrypt = jest.fn();
        when(mockBcrypt).calledWith("test", 10).mockResolvedValue("password");
        bcrypt.hash = mockBcrypt;

        const mockDept = jest.fn();
        when(mockDept)
            .calledWith(1)
            .mockResolvedValue({ id: 1, name: "test" } as Department);
        departmentService.getDepartmentById = mockDept;

        const mock = jest.fn();
        when(mock).mockResolvedValue(employeeData);
        employeeRepository.save = mock;

        const mockEmpDept = jest.fn();
        when(mockEmpDept).mockResolvedValue(empDept);

        jest.spyOn(employeeDepartmentService, "saveEmployeeDepartment").mockResolvedValue(empDept);
        const response = await employeeService.createEmployee({ ...employeeData, departmentId: 1 });
        expect(response.name).toEqual("test");
        expect(response.age).toEqual(25);
    });

    it("should delete an employee", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);
        employeeRepository.softDelete = mock;
        const user = await employeeService.deleteEmployee(1);

        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should update an employee", async () => {
        const employee = {
            email: "test@gmail.com",
            age: 25,
            role: Role.HR,
            name: "test",
        };

        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(employeeData);

        const saveMock = jest.fn();
        when(saveMock).mockResolvedValue(employeeData);

        const response = await employeeService.updateEmployee(1, employee as UpdateEmployeeDto);

        expect(response).toEqual(employeeData);
    });

    it("should return a token for the given employee", async () => {
        jest.spyOn(employeeRepository, "findOneBy").mockResolvedValue({ id: 1, name: "test", password: "password" } as Employee);
        const mockBcrypt = jest.fn();
        when(mockBcrypt).calledWith("password", "password").mockResolvedValue(true);
        bcrypt.compare = mockBcrypt;

        const mockJwt = jest.fn();
        when(mockJwt).calledWith(expect.any(Object), JWT_SECRET, { expiresIn: JWT_VALIDITY }).mockResolvedValue("token");

        jwt.sign = mockJwt;
        const result = await employeeService.loginEmployee("email", "password");
        expect(result).toEqual("token");
    });
});
