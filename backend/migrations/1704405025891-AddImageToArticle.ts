import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToArticle1704405025891 implements MigrationInterface {
    name = 'AddImageToArticle1704405025891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`imageUrl\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`imageUrl\``);
    }

}
