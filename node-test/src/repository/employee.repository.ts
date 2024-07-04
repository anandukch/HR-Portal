import { DataSource } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    public datasource: DataSource;
    constructor() {
        this.datasource = dataSource;
    }

    async find(): Promise<Employee[]> {
        const employeeRepository = this.datasource.getRepository(Employee);
        return employeeRepository.find();
    }

    async findOneBy(filter: Partial<Employee>): Promise<Employee> {
        const employeeRepository = this.datasource.getRepository(Employee);
        return employeeRepository.findOne({ where: filter });
    }

    async create(data: Employee): Promise<Employee> {
        const employeeRepository = this.datasource.getRepository(Employee);

        return employeeRepository.save(data);
    }

    async update(filter: Partial<Employee>, data: Partial<Employee>): Promise<Employee> {
        const employeeRepository = this.datasource.getRepository(Employee);
        const employee = await employeeRepository.findOne({ where: filter });
        employee.name = data.name;
        employee.email = data.email;
        return employeeRepository.save(employee);
    }

    async delete(filter: Partial<Employee>): Promise<void> {
        const employeeRepository = dataSource.getRepository(Employee);
        await employeeRepository.softDelete(filter.id);
    }
}

export default EmployeeRepository;
