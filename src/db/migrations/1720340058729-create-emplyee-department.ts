import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmplyeeDepartment1720340058729 implements MigrationInterface {
    name = 'CreateEmplyeeDepartment1720340058729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee_department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "employee_id" integer, "department_id" integer, CONSTRAINT "PK_d62835db8c0aec1d18a5a927549" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_department" ADD CONSTRAINT "FK_29af57c55c425f7470809bffe85" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_29af57c55c425f7470809bffe85"`);
        await queryRunner.query(`ALTER TABLE "employee_department" DROP CONSTRAINT "FK_092efbaf83f18fe0590eb8fea80"`);
        await queryRunner.query(`DROP TABLE "employee_department"`);
    }

}
