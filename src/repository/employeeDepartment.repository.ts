import { Repository } from "typeorm";
import EmployeeDepartment from "../entity/employeeDepartment.entity";
import dataSource from "../db/data-source.db";

class EmployeeDepartmentRepository {
    constructor(private repository: Repository<EmployeeDepartment>) {}

    findAll = async (): Promise<EmployeeDepartment[]> => {
        return this.repository.find({
            relations: ["employee", "department"],
        });
    };

    find = async (filter: Partial<EmployeeDepartment>): Promise<EmployeeDepartment[]> => {
        return this.repository.find({ where: filter });
    };

    findOneBy = async (filter: Partial<EmployeeDepartment>): Promise<EmployeeDepartment> => {
        return this.repository.findOne({ where: filter, relations: ["employee", "department"] });
    };

    create = async (data: EmployeeDepartment): Promise<EmployeeDepartment> => {
        return this.repository.create(data);
    };
    save = async (data: EmployeeDepartment): Promise<EmployeeDepartment> => {
        return this.repository.save(data);
    };
}

export default EmployeeDepartmentRepository;
