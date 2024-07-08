import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";
import Address from "../../src/entity/address.entity";
import { Role } from "../../src/utils/role.enum";
import bcrypt from "bcrypt";
import Department from "../../src/entity/department.entity";

describe("Employee service", () => {
    let employeeRepository: EmployeeRepository;
    let employeeService: EmployeeService;
    // let departmentService: DepartmentService;
    // let departmentRepository: DepartmentRepository;

    let departmentService: jest.Mocked<DepartmentService>;
    let departmentRepository: jest.Mocked<DepartmentRepository>;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
            departmentService: jest.fn(),
        };


        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>;
        departmentService = new DepartmentService(
            departmentRepository as jest.Mocked<DepartmentRepository>
        ) as jest.Mocked<DepartmentService>;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        // departmentService = dataSource.departmentService() as jest.Mocked<DepartmentService>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should return all employees", async () => {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;
        const users = await employeeService.getAllEmployees();
        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should return an employees with the given id", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);
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
        const mockDepartment = {
            id: 1,
            name: "test",
            createdAt: new Date(),
            updatedAt: new Date(),
            employeeDepartments: [],
            deletedAt: new Date(),
        } as Department;

        when(departmentService.getDepartmentById)
            .calledWith(1)
            .mockResolvedValue(mockDepartment);

        const mock = jest.fn();
        when(mock).mockResolvedValue(null);

        employeeRepository.save = mock;

        const employee = {
            name: "test",
            email: "test@gmail.com",
            age: 25,
            departmentId: 1,
            password: "test",
            role: Role.HR,
            address: {
                line1: "test",
                pincode: "123456",
            },
        };

        const createdRmp = await employeeService.createEmployee(employee);
        expect(createdRmp.name).toEqual("test");
    });
});
