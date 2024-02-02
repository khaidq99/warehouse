import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserTable1706846597416 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "line1", type: "varchar" },
          { name: "street", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "current_timestamp()" },
          { name: "updated_at", type: "timestamp", onUpdate: "current_timestamp()", default: "current_timestamp()" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "username", type: "varchar" },
          { name: "password", type: "varchar" },
          { name: "name", type: "varchar" },
          { name: "address_id", type: "int" },
          { name: "created_at", type: "timestamp", default: "current_timestamp()" },
          { name: "updated_at", type: "timestamp", onUpdate: "current_timestamp()", default: "current_timestamp()" }
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["address_id"],
            referencedTableName: "address",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
