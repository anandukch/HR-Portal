import Department from "../entity/department.entity";
import HttpException from "../exceptions/http.exceptions";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}

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
        return this.departmentRepository.softDelete(department);
    };

    // getDepartmentEmployees = async (id: number) => {
    //     const department = await this.getDepartmentById(id);
    //     return department.employees;
    // };
}

export default DepartmentService;
