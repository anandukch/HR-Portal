import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import DepartmentRepository from "../../src/repository/department.repository";
import Department from "../../src/entity/department.entity";
import DepartmentService from "../../src/service/department.service";

describe("Department service", () => {
    let departmentRepository: DepartmentRepository;
    let departmentService: DepartmentService;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };

        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)) as jest.Mocked<DepartmentRepository>;
        departmentService = new DepartmentService(departmentRepository);
    });

    it("should return all departments", async () => {
        const mock = jest.fn(departmentRepository.find).mockResolvedValue([]);
        departmentRepository.find = mock;
        const departments = await departmentService.getAllDepartments();
        expect(departments).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should return a department with the given id", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Employee);
        departmentRepository.findOneBy = mock;
        const user = await departmentRepository.findOneBy({ id: 1 });
        expect(user!.name).toEqual("test");
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("show throw exception", async () => {
        const mock = jest.fn();
        when(mock).mockResolvedValue(null);
        departmentRepository.findOneBy = mock;
        // await expect(employeeRepository.findOneBy())
    });

    it("should create a department", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "test" } as Department);

        departmentRepository.findOneBy = mock;
        // await expect(employeeRepository.findOneBy())
        const createMock = jest.fn();
        when(createMock).mockResolvedValue({ name: "test" });
        departmentRepository.create = createMock;
        const response = await departmentService.createDepartment("test");
        expect(response).toEqual({ name: "test" });
    });

    it("should update a department", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith(1)
            .mockResolvedValue({ id: 1, name: "test" } as Department);
        departmentService.getDepartmentById = mock;

        const saveMock = jest.fn();
        when(saveMock).mockResolvedValue({ name: "test" });
        departmentRepository.save = saveMock;
        const reposne = await departmentService.updateDepartment(1, { name: "test" });
        expect(reposne).toEqual({ name: "test" });
        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should update the given department", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith(1)
            .mockResolvedValue({ id: 1, name: "test" } as Department);
        departmentService.getDepartmentById = mock;

        const saveMock = jest.fn();
        when(saveMock).mockResolvedValue({ name: "test" });
        departmentRepository.save = saveMock;

        const response = await departmentService.updateDepartment(1, { name: "test" });
        expect(response).toEqual({ name: "test" });
        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should delete the given department", async () => {
        const mock = jest.fn();
        when(mock)
            .calledWith(1)
            .mockResolvedValue({ id: 1, name: "test" } as Department);
        departmentService.getDepartmentById = mock;

        jest.spyOn(departmentService, "getDepartmentEmployees").mockResolvedValue([]);
        const softDeleteMock = jest.fn();
        when(softDeleteMock).mockResolvedValue({ name: "test" });
        departmentRepository.softDelete = softDeleteMock;

        const response = await departmentService.deleteDepartment(1);
        expect(response).toEqual({ name: "test" });
        expect(softDeleteMock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledTimes(1);
    });
});
