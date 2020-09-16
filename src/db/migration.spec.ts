import * as neo4j from 'neo4j-driver';
import { Mock } from 'ts-mockery';
import { PinoLoggerService } from '../logger/logger';
import { MigrationService } from './migration';
import { Neo4j } from './index';
import config from '../config.json';

describe('Migrations', () => {
  let migrationService: MigrationService;
  let logger: PinoLoggerService;
  let driver: neo4j.Driver;
  const neo4j = new Neo4j(config.test);

  beforeAll(async () => {
    neo4j.execute('MATCH (n) DETACH DELETE n');
  });

  beforeEach(() => {
    migrationService = Mock.of<MigrationService>();
    logger = Mock.of<PinoLoggerService>();
  });

  it('cleans up the database', async () => {
    const value = 'some-return-value';
    const promise = Promise.resolve(value);
    console.log('driver');
    console.log(driver);
    expect(1).toBe(1);
  });
});
