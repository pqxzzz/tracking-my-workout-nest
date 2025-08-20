import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1755094219647 implements MigrationInterface {
    name = 'Init1755094219647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "createdAt"`);
    }

}
