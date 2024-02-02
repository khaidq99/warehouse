import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUser1706866844881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "user",
          new TableColumn({
              name: "is_admin",
              type: "boolean",
              default: "false"
          }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
