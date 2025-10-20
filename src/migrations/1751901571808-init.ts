import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1751901571808 implements MigrationInterface {
  name = 'Init1751901571808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "muscleGroup" character varying, "ptBrName" character varying, "videoReference" character varying, "imageReference" character varying, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "muscles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "imageReference" character varying, "svgReference" character varying, "ptBrName" character varying, CONSTRAINT "PK_d447d24f0750ae71b1ec5ae9668" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises_muscles_muscles" ("exercisesId" uuid NOT NULL, "musclesId" uuid NOT NULL, CONSTRAINT "PK_4eb69533e7ae1c760491ec09db3" PRIMARY KEY ("exercisesId", "musclesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_074df2f460922362261a56c6dd" ON "exercises_muscles_muscles" ("exercisesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b79fe2fe867211b794e1b72c0" ON "exercises_muscles_muscles" ("musclesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "muscles_exercises_exercises" ("musclesId" uuid NOT NULL, "exercisesId" uuid NOT NULL, CONSTRAINT "PK_cc4942f657788100c11689e1611" PRIMARY KEY ("musclesId", "exercisesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_977dd021b32803d91d9309d537" ON "muscles_exercises_exercises" ("musclesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_08450e52a29c102c6ded846771" ON "muscles_exercises_exercises" ("exercisesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" ADD CONSTRAINT "FK_074df2f460922362261a56c6dd1" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" ADD CONSTRAINT "FK_9b79fe2fe867211b794e1b72c07" FOREIGN KEY ("musclesId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "muscles_exercises_exercises" ADD CONSTRAINT "FK_977dd021b32803d91d9309d537e" FOREIGN KEY ("musclesId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "muscles_exercises_exercises" ADD CONSTRAINT "FK_08450e52a29c102c6ded846771e" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "muscles_exercises_exercises" DROP CONSTRAINT "FK_08450e52a29c102c6ded846771e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "muscles_exercises_exercises" DROP CONSTRAINT "FK_977dd021b32803d91d9309d537e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" DROP CONSTRAINT "FK_9b79fe2fe867211b794e1b72c07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises_muscles_muscles" DROP CONSTRAINT "FK_074df2f460922362261a56c6dd1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_08450e52a29c102c6ded846771"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_977dd021b32803d91d9309d537"`,
    );
    await queryRunner.query(`DROP TABLE "muscles_exercises_exercises"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9b79fe2fe867211b794e1b72c0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_074df2f460922362261a56c6dd"`,
    );
    await queryRunner.query(`DROP TABLE "exercises_muscles_muscles"`);
    await queryRunner.query(`DROP TABLE "muscles"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
  }
}
