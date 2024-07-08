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
import { UpdateEmployeeDto } from "../../src/dto/employee.dto";

describe("Employee service", () => {
    let employeeRepository: EmployeeRepository;
    let employeeService: EmployeeService;
    let departmentService: DepartmentService;
    // let departmentRepository: DepartmentRepository;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
            departmentService: jest.fn(),
        };

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        departmentService = dataSource.departmentService() as jest.Mocked<DepartmentService>;
        employeeService = new EmployeeService(employeeRepository, departmentService);
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

        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);
        employeeRepository.findOneBy = mock;
        const user = await employeeService.getEmployeeById(1);
        expect(user!.name).toEqual("test");
        expect(mock).toHaveBeenCalledTimes(1);
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
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);

        employeeRepository.update = mock;

        const saveMock = jest.fn();
        when(saveMock)
            .calledWith(employee)
            .mockResolvedValue({ id: 1, name: "test" } as Employee);

        employeeRepository.save = saveMock;

        await employeeService.updateEmployee(1, employee as UpdateEmployeeDto);

        expect(saveMock).toHaveBeenCalledTimes(1);
    });
});
