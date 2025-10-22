import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1755699164688 implements MigrationInterface {
  name = 'Init1755699164688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout_logs" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "workoutId" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_53a1e174f32d705c6471f3ae7fe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "workout_logs"`);
  }
}
