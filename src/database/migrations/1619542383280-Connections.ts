import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class Connections1619542383280 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'connections',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          }, {
            name: 'admin_id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isNullable: true
          }, {
            name: 'user_id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isNullable: true
          }, {
            name: 'socket_id',
            type: 'varchar',
            isNullable: true
          }, {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }, {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }), true)
    await queryRunner.createForeignKey(
      'connections',
      new TableForeignKey({
        name: 'FKConnectionUserID',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('connections', 'FKConnectionUserID')
    await queryRunner.dropTable('connections')
  }
}
