import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1751556072678 implements MigrationInterface {
  name = 'Init1751556072678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_weights" DROP COLUMN "UserId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_weights" ADD "UserId" character varying NOT NULL`,
    );
  }
}
