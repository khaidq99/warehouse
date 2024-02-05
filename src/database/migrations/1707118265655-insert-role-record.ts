import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRoleRecord1707118265655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO role (name) VALUES ('user')`
        )
        await queryRunner.query(
          `INSERT INTO role (name) VALUES ('admin')`
        )
        await queryRunner.query(
          `INSERT INTO role (name) VALUES ('operator')`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
