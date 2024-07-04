import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeRespository: EmployeeRepository) {}

    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRespository.find();
    };

    getEmployeeById = async (id: number): Promise<Employee | null> => {
        return this.employeeRespository.findOneBy({ id });
    };

    createEmployee = async (email: string, name: string): Promise<Employee> => {
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        return this.employeeRespository.create(newEmployee);
    };

    updateEmployee = async (filter: Partial<Employee>, employee: Partial<Employee>): Promise<Employee> => {
        return this.employeeRespository.update(filter, employee);
    };

    deleteEmployee = async (filter: Partial<Employee>): Promise<void> => {
        return this.employeeRespository.delete(filter);
    };
}

export default EmployeeService;
