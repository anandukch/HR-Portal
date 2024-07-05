
import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";

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
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);
        employeeRepository.findOneBy = mock;
        const user = await employeeService.getEmployeeById(1);
        expect(user!.name).toEqual("test");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it('show throw exception',async()=>{
        const mock = jest.fn();
        when(mock).mockResolvedValue(null)
        employeeRepository.findOneBy=  mock
        // await expect(employeeRepository.findOneBy())
    })
});
