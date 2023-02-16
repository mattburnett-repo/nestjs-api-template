import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test011676476097823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "test" ADD COLUMN "description" VARCHAR`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "test" RESTART IDENTITY`); // reverts things made in "up" method
  }
}
