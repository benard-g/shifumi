import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGameRoom1639326936505 implements MigrationInterface {
  name = 'createGameRoom1639326936505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game_rooms" ("id" character varying NOT NULL, "cache" jsonb NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_026d3197a67b9676bc09a996d98" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "game_rooms"`);
  }
}
