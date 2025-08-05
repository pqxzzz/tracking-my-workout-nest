import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754403988068 implements MigrationInterface {
    name = 'Init1754403988068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workoutSet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_13c69ee9dae3de7fe473a09441a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workouts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "workoutSetId" uuid, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "workoutId" uuid`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_174822693342049522cdcd3f53d" FOREIGN KEY ("workoutSetId") REFERENCES "workoutSet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_174822693342049522cdcd3f53d"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "workoutId"`);
        await queryRunner.query(`DROP TABLE "workouts"`);
        await queryRunner.query(`DROP TABLE "workoutSet"`);
    }

}
