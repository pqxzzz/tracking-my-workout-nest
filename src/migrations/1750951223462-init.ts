import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750951223462 implements MigrationInterface {
    name = 'Init1750951223462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "confirmationTokenExpiredAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmationTokenExpiredAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "confirmationToken"`);
    }

}
