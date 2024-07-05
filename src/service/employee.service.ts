import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
    constructor(private employeeRespository: EmployeeRepository) {}

    getAllEmployees = async (): Promise<Employee[]> => {
        return this.employeeRespository.find();
    };

    getEmployeeById = async (id: number): Promise<Employee | null> => {
        return this.employeeRespository.findOneBy({ id });
    };

    createEmployee = async (email: string, name: string, age: number, address: any): Promise<Employee> => {
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;

        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;

        newEmployee.address = newAddress;

        return this.employeeRespository.create(newEmployee);
    };

    updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
        const employeeToUpdate = await this.getEmployeeById(id);
        if (!employeeToUpdate) {
            throw new HttpException(404, `No employee found with id :${id}`);
        }

        employeeToUpdate.name = employee.name
        employeeToUpdate.email = employee.email
        employeeToUpdate.age = employee.age
        employeeToUpdate.address.line1 = employee.address.line1
        employeeToUpdate.address.pincode = employee.address.pincode
        return this.employeeRespository.save(employeeToUpdate);
    };

    deleteEmployee = async (id: number): Promise<void> => {
        const employee = await this.getEmployeeById(id);
        return this.employeeRespository.softDelete(employee);
    };
}

export default EmployeeService;