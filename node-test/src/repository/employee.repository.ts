import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    async find(): Promise<Employee[]> {
        return this.repository.find();
    }

    async findOneBy(filter: Partial<Employee>): Promise<Employee> {
        return this.repository.findOne({ where: filter, relations: ["address"] });
    }

    async create(data: Employee): Promise<Employee> {
        return this.repository.save(data);
    }

    async update(filter: Partial<Employee>, data: Partial<Employee>): Promise<Employee> {
        const employee = await this.repository.findOne({ where: filter });
        employee.name = data.name;
        employee.email = data.email;
        return this.repository.save(employee);
    }

    async delete(filter: Partial<Employee>): Promise<void> {
        await this.repository.delete(filter.id);
    }

    softDelete = async (employee: Employee): Promise<void> => {
        await this.repository.softRemove(employee);
    };
}

export default EmployeeRepository;
