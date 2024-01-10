import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamedColumnOnVote1704845060827 implements MigrationInterface {
    name = 'RenamedColumnOnVote1704845060827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`state\` \`type\` enum ('up', 'down') NOT NULL DEFAULT 'up'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`type\` \`state\` enum ('up', 'down') NOT NULL DEFAULT 'up'`);
    }

}
