import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1751555669457 implements MigrationInterface {
  name = 'Migrations1751555669457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_weights" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "UserId" character varying NOT NULL, "date" date NOT NULL, "weight" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_c706b25a032e9440ddc219762c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_weights" ADD CONSTRAINT "FK_52a1d12efaab2946140fea97548" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_weights" DROP CONSTRAINT "FK_52a1d12efaab2946140fea97548"`,
    );
    await queryRunner.query(`DROP TABLE "user_weights"`);
  }
}
