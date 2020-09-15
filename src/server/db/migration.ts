import * as neo4j from 'neo4j-driver';
import { LogLevel } from '../logger/log-level.type';
import { Neo4j } from './index';
import seedData from './seed.json';
import { PinoLoggerService } from '../logger/logger';
import { DataTree, LoadDataResult, RemoveDataResult } from './migration.types';
import config from '../../config.json';

export class MigrationService {
  private readonly seedData: DataTree;

  private readonly logger: any;

  private readonly neo4j: any;

  constructor() {
    this.seedData = seedData;
    this.logger = new PinoLoggerService(LogLevel.Info);
    this.neo4j = new Neo4j(config.default);
  }

  private buildCreationStatements(data?: DataTree) {
    const createNodeStatements: string[] = [];
    const createRelationshipsStatements: string[] = [];
    const newNodesList: string[] = [];

    // TODO: May be useful for future test implementation
    const dataSource = !data ? this.seedData : data;

    dataSource.data.map(
      async (node): Promise<void> => {
        const nodeTag = `node${node.name.replace(/-/g, '')}`;
        const nodeParent = `node${node.parent}`;
        createNodeStatements.push(
          `(${nodeTag}:Node {name: "${node.name}", description: "${node.description}"})`
        );
        if (node.parent) {
          createRelationshipsStatements.push(
            `(${nodeParent})-[:IS_PARENT]->(${nodeTag})`
          );
        }
        newNodesList.push(nodeTag);
      }
    );
    return [createNodeStatements, createRelationshipsStatements, newNodesList];
  }

  private exitSuccessfully = (result: neo4j.QueryResult) =>
    Promise.resolve({
      success: true,
      count: result?.records.length || 0
    });

  private exitWithError = (e: Error) => {
    this.logger.error(e.message);
    return Promise.reject(new Error(e.message));
  };

  private async removeData(): Promise<RemoveDataResult> {
    let result;
    try {
      result = await this.neo4j.execute('MATCH (n) DETACH DELETE n');
      return this.exitSuccessfully(result);
    } catch (e) {
      return this.exitWithError(e);
    }
  }

  private async loadSeedData(data?: DataTree): Promise<LoadDataResult> {
    let result;
    const [
      createNodeStatements,
      createRelationshipsStatements,
      newNodesList
    ] = this.buildCreationStatements(data);

    try {
      result = await this.neo4j.execute(
        `CREATE ${createNodeStatements} CREATE ${createRelationshipsStatements} WITH ${newNodesList} MATCH relations=()-[:IS_PARENT]-() RETURN relations`
      );
      return this.exitSuccessfully(result);
    } catch (e) {
      return this.exitWithError(e);
    }
  }

  public async run() {
    try {
      const deleteData = await this.removeData();
      this.logger.info(deleteData);
      const loadData = await this.loadSeedData();
      this.logger.info(loadData);
    } finally {
      process.exit(0);
    }
  }
}

const migrations = new MigrationService();
migrations.run();
