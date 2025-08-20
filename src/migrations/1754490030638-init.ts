import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754490030638 implements MigrationInterface {
    name = 'Init1754490030638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "information" character varying`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "series" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "repetitions" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "weight" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "repetitions"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "series"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "information"`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "description" character varying NOT NULL`);
    }

}
