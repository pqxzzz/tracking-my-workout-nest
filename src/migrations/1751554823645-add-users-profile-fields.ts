import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersProfileFields1751554823645 implements MigrationInterface {
    name = 'AddUsersProfileFields1751554823645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" date`);
        await queryRunner.query(`ALTER TABLE "users" ADD "height" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
