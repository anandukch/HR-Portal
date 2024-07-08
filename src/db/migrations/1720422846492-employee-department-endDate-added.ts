import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeDepartmentEndDateAdded1720422846492 implements MigrationInterface {
    name = 'EmployeeDepartmentEndDateAdded1720422846492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_department" ADD "end_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_department" DROP COLUMN "end_date"`);
    }

}
