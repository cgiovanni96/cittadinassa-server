import {MigrationInterface, QueryRunner} from "typeorm";

export class childrenNet1646226558046 implements MigrationInterface {
    name = 'childrenNet1646226558046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fish" ADD "eventDate" date`);
        await queryRunner.query(`ALTER TABLE "fish" ADD "date" date`);
        await queryRunner.query(`ALTER TABLE "fish" ADD "startDate" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fish" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "fish" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "fish" DROP COLUMN "eventDate"`);
    }

}
