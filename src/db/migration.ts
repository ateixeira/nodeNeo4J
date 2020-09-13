import * as neo4j from 'neo4j-driver';
import { QueryResult } from 'neo4j-driver';
import driver from './index';
import seedData from './seed.json';

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

class Migrations {
  private readonly session: neo4j.Session;

  private readonly seedData: DataTree;

  constructor() {
    this.session = driver.session();
    this.seedData = seedData;
  }

  private buildCreationStatements() {
    const createNodeStatements: string[] = [];
    const createRelationshipsStatements: string[] = [];
    const newNodesList: string[] = [];

    this.seedData.data.reverse().map(
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

  private async loadSeedData(entry?: DataTree): Promise<LoadDataResult> {
    const [
      createNodeStatements,
      createRelationshipsStatements,
      newNodesList
    ] = this.buildCreationStatements();

    const session = driver.session();
    let result;
    let success = true;
    try {
      result = await this.session.run(
        `CREATE ${createNodeStatements} CREATE ${createRelationshipsStatements} WITH ${newNodesList} MATCH relations=()-[:isChildOf]-() RETURN relations`
      );
    } catch (e) {
      success = false;
      // eslint-disable-next-line no-console
      console.error('ERROR: ', e);
    } finally {
      await session.close();
      await driver.close();
    }

    return Promise.resolve({
      success,
      count: result?.records.length || 0
    });
  }

  public async run() {
    const loadData = await this.loadSeedData();
    console.info(loadData);
  }
}

const migrations = new Migrations();
migrations.run();
