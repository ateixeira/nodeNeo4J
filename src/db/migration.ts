import * as neo4j from 'neo4j-driver';
import { LogLevel } from '../logger/log-level.type';
import driver from './index';
import seedData from './seed.json';
import { PinoLoggerService } from '../logger/logger';

type DataNode = {
  name: string;
  description: string;
  parentId?: string;
  parent?: string;
};

type DataTree = {
  data: DataNode[];
};

type LoadDataResult = {
  success: boolean;
  count: number;
};

type RemoveDataResult = {
  success: boolean;
  count: number;
};

class Migrations {
  private readonly session: neo4j.Session;

  private readonly seedData: DataTree;

  private readonly logger: any;

  constructor() {
    this.session = driver.session();
    this.seedData = seedData;
    this.logger = new PinoLoggerService(LogLevel.Info);
  }

  private buildCreationStatements(data?: DataTree) {
    const createNodeStatements: string[] = [];
    const createRelationshipsStatements: string[] = [];
    const newNodesList: string[] = [];

    // TODO: May be useful for future test implementation
    const dataSource = !data ? this.seedData : data;

    dataSource.data.reverse().map(
      async (node): Promise<void> => {
        const nodeTag = `node${node.name.replace(/-/g, '')}`;
        const nodeParent = `node${node.parent}`;
        createNodeStatements.push(
          `(${nodeTag}:Node {name: "${node.name}", description: "${node.description}"})`
        );
        if (node.parent) {
          createRelationshipsStatements.push(
            `(${nodeTag})-[:isChildOf]->(${nodeParent})`
          );
        }
        newNodesList.push(nodeTag);
      }
    );
    return [createNodeStatements, createRelationshipsStatements, newNodesList];
  }

  private async removeData(): Promise<RemoveDataResult> {
    let result;
    try {
      result = await this.session.run('MATCH (n) DETACH DELETE n');
      return Promise.resolve({
        success: true,
        count: result?.records.length || 0
      });
    } catch (e) {
      this.logger.error(e.message);
      return Promise.reject(new Error(e.message));
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
      result = await this.session.run(
        `CREATE ${createNodeStatements} CREATE ${createRelationshipsStatements} WITH ${newNodesList} MATCH relations=()-[:isChildOf]-() RETURN relations`
      );
      return Promise.resolve({
        success: true,
        count: result?.records.length || 0
      });
    } catch (e) {
      this.logger.error(e.message);
      return Promise.reject(new Error(e.message));
    }
  }

  public async run() {
    try {
      const deleteData = await this.removeData();
      this.logger.info(deleteData);
      const loadData = await this.loadSeedData();
      this.logger.info(loadData);
    } finally {
      await this.session.close();
      await driver.close();
    }
  }
}

const migrations = new Migrations();
migrations.run();
