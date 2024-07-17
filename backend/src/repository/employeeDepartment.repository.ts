import { Repository } from "typeorm";
import EmployeeDepartment from "../entity/employeeDepartment.entity";
import dataSource from "../db/dataSource.db";

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
        const response = await this.repository.findOne({
            where: {
                employee_id: filter.employee_id,
            },
            relations: ["department"],
        });
        return response;
    };

    create = async (data: EmployeeDepartment): Promise<EmployeeDepartment> => {
        return this.repository.create(data);
    };
    save = async (data: EmployeeDepartment): Promise<EmployeeDepartment> => {
        return this.repository.save(data);
    };
}

export default EmployeeDepartmentRepository;
