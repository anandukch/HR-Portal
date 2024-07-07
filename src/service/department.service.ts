import dataSource from "../db/data-source.db";
import Department from "../entity/department.entity";
import EmployeeDepartment from "../entity/employeeDepartment.entity";
import HttpException from "../exceptions/http.exceptions";
import DepartmentRepository from "../repository/department.repository";
import EmployeeDepartmentRepository from "../repository/employeeDepartment.repository";

class DepartmentService {
    // private employeeDepartmentRepository: EmployeeDepartmentRepository;
    constructor(private departmentRepository: DepartmentRepository) {
        // this.employeeDepartmentRepository = new EmployeeDepartmentRepository(dataSource.getRepository(EmployeeDepartment));
    }

    getAllDepartments = async () => {
        return this.departmentRepository.find();
    };

    getDepartmentById = async (id: number) => {
        return this.departmentRepository.findOneBy({ id });
    };

    createDepartment = async (name: string) => {
        const newDepartment = new Department();
        newDepartment.name = name;
        return this.departmentRepository.create(newDepartment);
    };

    updateDepartment = async (id: number, department: Partial<Department>) => {
        const departmentToUpdate = await this.getDepartmentById(id);
        if (!departmentToUpdate) {
            throw new HttpException(404, `No department found with id :${id}`);
        }

        departmentToUpdate.name = department.name;
        return this.departmentRepository.save(departmentToUpdate);
    };

    deleteDepartment = async (id: number) => {
        const department = await this.getDepartmentById(id);
        if (!department) {
            throw new HttpException(404, `No department found with id :${id}`);
        }

        const departmentEmployees = await this.getDepartmentEmployees(id);
        if (departmentEmployees.length > 0) {
            throw new HttpException(400, `Department with id :${id} has employees`);
        }

        return this.departmentRepository.softDelete(department);
    };

    getDepartmentEmployees = async (id: number) => {
        const department = await this.getDepartmentById(id);
        if (!department) {
            throw new HttpException(404, `No department found with id :${id}`);
        }

        return (await this.getDepartmentById(id)).employeeDepartments;
    };
}

export default DepartmentService;
