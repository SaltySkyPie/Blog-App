import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationModifications1705090134728 implements MigrationInterface {
    name = 'RelationModifications1705090134728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vote\` DROP FOREIGN KEY \`FK_f5de237a438d298031d11a57c3b\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP FOREIGN KEY \`FK_ad37adcff60fdb9670a97868ab1\``);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`userId\` \`userId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`commentId\` \`commentId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_636f17dadfea1ffb4a412296a28\``);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`userId\` \`userId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD CONSTRAINT \`FK_f5de237a438d298031d11a57c3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD CONSTRAINT \`FK_ad37adcff60fdb9670a97868ab1\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_636f17dadfea1ffb4a412296a28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_636f17dadfea1ffb4a412296a28\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP FOREIGN KEY \`FK_ad37adcff60fdb9670a97868ab1\``);
        await queryRunner.query(`ALTER TABLE \`vote\` DROP FOREIGN KEY \`FK_f5de237a438d298031d11a57c3b\``);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_636f17dadfea1ffb4a412296a28\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`commentId\` \`commentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`vote\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD CONSTRAINT \`FK_ad37adcff60fdb9670a97868ab1\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vote\` ADD CONSTRAINT \`FK_f5de237a438d298031d11a57c3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
