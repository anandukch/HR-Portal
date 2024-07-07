import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
    constructor(private repository: Repository<Department>) {}

    find = async (relations?: {}): Promise<Department[]> => {
        return this.repository.find(relations);
    };

    findOneBy = async (filter: Partial<Department>): Promise<Department> => {
        return this.repository.findOne({ where: filter, relations: ["employeeDepartments", "employeeDepartments.employee"] });
    };

    create = async (data: Department): Promise<Department> => {
        return this.repository.save(data);
    };

    save = async (department: Department): Promise<Department> => {
        return this.repository.save(department);
    };

    delete = async (filter: Partial<Department>): Promise<void> => {
        await this.repository.delete(filter.id);
    };

    softDelete = async (department: Department): Promise<void> => {
        await this.repository.softRemove(department);
    };
}

export default DepartmentRepository;
