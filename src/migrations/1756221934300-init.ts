import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1756221934300 implements MigrationInterface {
  name = 'Init1756221934300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_logs" DROP COLUMN "workoutId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_logs" ADD "workoutId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_logs" ADD CONSTRAINT "FK_8eba93fcb3556b8886579a8f14a" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_logs" DROP CONSTRAINT "FK_8eba93fcb3556b8886579a8f14a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_logs" DROP COLUMN "workoutId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_logs" ADD "workoutId" character varying NOT NULL`,
    );
  }
}
