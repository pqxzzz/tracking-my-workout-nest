import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1751901752750 implements MigrationInterface {
  name = 'Init1751901752750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" DROP CONSTRAINT "FK_9b79fe2fe867211b794e1b72c07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" ADD CONSTRAINT "FK_9b79fe2fe867211b794e1b72c07" FOREIGN KEY ("musclesId") REFERENCES "muscles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" DROP CONSTRAINT "FK_9b79fe2fe867211b794e1b72c07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" ADD CONSTRAINT "FK_9b79fe2fe867211b794e1b72c07" FOREIGN KEY ("musclesId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
