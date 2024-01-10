import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedVoteEntity1704844879572 implements MigrationInterface {
    name = 'AddedVoteEntity1704844879572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`state\` enum ('up', 'down') NOT NULL DEFAULT 'up'`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD \`commentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD CONSTRAINT \`FK_f5de237a438d298031d11a57c3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD CONSTRAINT \`FK_ad37adcff60fdb9670a97868ab1\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` DROP FOREIGN KEY \`FK_ad37adcff60fdb9670a97868ab1\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP FOREIGN KEY \`FK_f5de237a438d298031d11a57c3b\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`commentId\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP COLUMN \`createdAt\``);
    }

}
