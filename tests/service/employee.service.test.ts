import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";
import { Role } from "../../src/utils/role.enum";
import DepartmentRepository from "../../src/repository/department.repository";
import Department from "../../src/entity/department.entity";

describe("Employee service", () => {
    let employeeRepository: EmployeeRepository;
    let employeeService: EmployeeService;
    let departmentRepository: DepartmentRepository;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>;
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
        const employeeMock = jest.fn();
        const departmentMock = jest.fn();
    
        when(employeeMock)
            .calledWith({ name: "test" })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);
        when(departmentMock)
            .calledWith(1)  
            .mockResolvedValue({ id: 1, name: "HR" }); 
    
        employeeRepository.create = employeeMock;
        departmentRepository.findOneBy = departmentMock;
    
        const user = await employeeService.createEmployee({
            name: "test",
            age: 20,
            email: "test@gmail.com",
            password: "test",
            role: Role.HR,
            address: {
                line1: "test",
                pincode: "123456",
            },
            departmentId: 1,
        });
    
        expect(user!.name).toEqual("test");
        expect(employeeMock).toHaveBeenCalledTimes(1);
        expect(departmentMock).toHaveBeenCalledTimes(1);
        expect(departmentMock).toHaveBeenCalledWith(1); 
    });
});
