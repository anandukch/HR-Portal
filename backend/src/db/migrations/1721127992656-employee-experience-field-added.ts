import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeeExperienceFieldAdded1721127992656 implements MigrationInterface {
    name = 'EmployeeExperienceFieldAdded1721127992656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80"`);
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_29af57c55c425f7470809bffe85"`);
        await queryRunner.query(`ALTER TABLE "employee_department" ALTER COLUMN "employee_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_department" ALTER COLUMN "department_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_29af57c55c425f7470809bffe85" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_29af57c55c425f7470809bffe85"`);
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80"`);
        await queryRunner.query(`ALTER TABLE "employee_department" ALTER COLUMN "department_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_department" ALTER COLUMN "employee_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_29af57c55c425f7470809bffe85" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
    }

}
