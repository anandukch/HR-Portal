import EmployeeDepartment from "../entity/employeeDepartment.entity";
import EmployeeDepartmentRepository from "../repository/employeeDepartment.repository";

class EmployeeDepartmentService {
    constructor(private repository: EmployeeDepartmentRepository) {}

    saveEmployeeDepartment = async (employeeDepartment: EmployeeDepartment): Promise<EmployeeDepartment> => {
        return this.repository.save(employeeDepartment);
    };

    findEmployeeDepartments = async (filter: Partial<EmployeeDepartment>): Promise<EmployeeDepartment[]> => {
        return this.repository.find(filter);
    };

    findEmployeeDepartment = async (filter: Partial<EmployeeDepartment>): Promise<EmployeeDepartment> => {
        
        return this.repository.findOneBy(filter);
    };
}

export default EmployeeDepartmentService;
