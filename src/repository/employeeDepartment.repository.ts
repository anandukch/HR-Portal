import { Repository } from "typeorm";
import EmployeeDepartment from "../entity/employeeDepartment.entity";
import dataSource from "../db/data-source.db";

class EmployeeDepartmentRepository {
    private repository: Repository<EmployeeDepartment>
    constructor() {
        this.repository = dataSource.getRepository(EmployeeDepartment)
    }

    find = async (): Promise<EmployeeDepartment[]> => {
        return this.repository.find({
            relations: ["employee", "department"],
        });
    };

    findOneBy = async (filter: Partial<EmployeeDepartment>): Promise<EmployeeDepartment> => {
        return this.repository.findOne({ where: filter, relations: ["employee", "department"] });
    };

    create = async (data: EmployeeDepartment): Promise<EmployeeDepartment> => {
        return this.repository.create(data);
    };
}

export default EmployeeDepartmentRepository;