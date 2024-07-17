import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeDepartmentAdded1721219570180 implements MigrationInterface {
    name = 'EmployeeDepartmentAdded1721219570180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "department" TO "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "department_id" TO "department"`);
    }

}
