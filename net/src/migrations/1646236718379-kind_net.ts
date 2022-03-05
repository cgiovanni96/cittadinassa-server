import {MigrationInterface, QueryRunner} from "typeorm";

export class kindNet1646236718379 implements MigrationInterface {
    name = 'kindNet1646236718379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fish" ADD "kind" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fish" DROP COLUMN "kind"`);
    }

}
