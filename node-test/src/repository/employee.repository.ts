import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    find = async (): Promise<Employee[]> => {
        return this.repository.find();
    };

    findOneBy = async (filter: Partial<Employee>): Promise<Employee> => {
        return this.repository.findOne({ where: filter, relations: ["address"] });
    };

    create = async (data: Employee): Promise<Employee> => {
        return this.repository.save(data);
    };

    update = async (filter: Partial<Employee>, data: Partial<Employee>): Promise<Employee> => {
        const employee = await this.repository.findOne({ where: filter });
        employee.name = data.name;
        employee.email = data.email;
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
