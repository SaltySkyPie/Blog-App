import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeArticleImageNullable1704405274956 implements MigrationInterface {
    name = 'MakeArticleImageNullable1704405274956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`imageUrl\` \`imageUrl\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`imageUrl\` \`imageUrl\` text NOT NULL`);
    }

}
