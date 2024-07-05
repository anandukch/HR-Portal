import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";
import { Role } from "../../src/utils/role.enum";

describe("Employee service", () => {
    let employeeRepository: EmployeeRepository;
    let employeeService: EmployeeService;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee)) as jest.Mocked<EmployeeRepository>;
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
        const employee = new Employee();
        employee.id = 2;
        employee.name = "test";
        employee.email = "test@gmail.com";
        employee.age = 23;
        employee.role = Role.HR;
        const mock = jest.fn(employeeRepository.findOneBy).mockResolvedValue(employee);
        employeeRepository.findOneBy = mock;
        const users = await employeeService.getEmployeeById(2);
        expect(users).toEqual(employee);
        expect(mock).toHaveBeenCalledTimes(1);
    });

});
