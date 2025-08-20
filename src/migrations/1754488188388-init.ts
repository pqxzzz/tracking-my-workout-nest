import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754488188388 implements MigrationInterface {
    name = 'Init1754488188388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workoutSet" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "activeWorkoutSetId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_6add6a9956f4f8f110d26348f85" UNIQUE ("activeWorkoutSetId")`);
        await queryRunner.query(`ALTER TABLE "workoutSet" ADD CONSTRAINT "FK_ab6f420fbcba2524fa6719c75bc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6add6a9956f4f8f110d26348f85" FOREIGN KEY ("activeWorkoutSetId") REFERENCES "workoutSet"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6add6a9956f4f8f110d26348f85"`);
        await queryRunner.query(`ALTER TABLE "workoutSet" DROP CONSTRAINT "FK_ab6f420fbcba2524fa6719c75bc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6add6a9956f4f8f110d26348f85"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activeWorkoutSetId"`);
        await queryRunner.query(`ALTER TABLE "workoutSet" DROP COLUMN "userId"`);
    }

}
