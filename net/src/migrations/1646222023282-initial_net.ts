import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialNet1646222023282 implements MigrationInterface {
  name = 'initialNet1646222023282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('-------------------------------------- FUCKING MIGRATION');

    await queryRunner.query(`CREATE TYPE "public"."role_type_enum" AS ENUM('Referente', 'Membro')`);
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type" "public"."role_type_enum" NOT NULL DEFAULT 'Membro', CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "fish_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userIds" text NOT NULL DEFAULT '[]', "fishId" uuid, "roleId" uuid, CONSTRAINT "PK_c95c5b76d3a43b0879df7b420b2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."fish_type_enum" AS ENUM('project', 'event', 'group')`,
    );
    await queryRunner.query(
      `CREATE TABLE "fish" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "codename" character varying NOT NULL, "description" text, "type" "public"."fish_type_enum" NOT NULL, "eventdIds" text NOT NULL DEFAULT '[]', "extraDrive" character varying, "extraDiscord" character varying, CONSTRAINT "UQ_83af8ea866371fe7b63deab7860" UNIQUE ("name"), CONSTRAINT "UQ_33535047ab815d85627ca954fc2" UNIQUE ("codename"), CONSTRAINT "PK_6ffb9180fd59d279a93e2a6f786" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fish_role" ADD CONSTRAINT "FK_48c51b108b0a0c4b65d14c02232" FOREIGN KEY ("fishId") REFERENCES "fish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fish_role" ADD CONSTRAINT "FK_b7236dbf05a49fb769f15d40efa" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fish_role" DROP CONSTRAINT "FK_b7236dbf05a49fb769f15d40efa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fish_role" DROP CONSTRAINT "FK_48c51b108b0a0c4b65d14c02232"`,
    );
    await queryRunner.query(`DROP TABLE "fish"`);
    await queryRunner.query(`DROP TYPE "public"."fish_type_enum"`);
    await queryRunner.query(`DROP TABLE "fish_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_type_enum"`);
  }
}
