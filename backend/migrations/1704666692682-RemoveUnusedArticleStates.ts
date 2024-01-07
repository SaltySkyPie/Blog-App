import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUnusedArticleStates1704666692682 implements MigrationInterface {
    name = 'RemoveUnusedArticleStates1704666692682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`state\` \`state\` enum ('draft', 'published', 'hidden') NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`state\` \`state\` enum ('draft', 'published', 'private', 'hidden', 'deleted') NOT NULL DEFAULT 'draft'`);
    }

}
