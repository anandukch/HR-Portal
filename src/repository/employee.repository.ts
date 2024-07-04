import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    find = async (): Promise<Employee[]> => {
        return this.repository.find({
            relations: ["address"],
        });
    };

    findOneBy = async (filter: Partial<Employee>): Promise<Employee> => {
        return this.repository.findOne({ where: filter, relations: ["address"] });
    };

    create = async (data: Employee): Promise<Employee> => {
        return this.repository.save(data);
    };

    save = async (employee: Employee): Promise<Employee> => {
        return this.repository.save(employee);
    };

    delete = async (filter: Partial<Employee>): Promise<void> => {
        await this.repository.delete(filter.id);
    };

    softDelete = async (employee: Employee): Promise<void> => {
        await this.repository.softRemove(employee);
    };
}

export default EmployeeRepository;
