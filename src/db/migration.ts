import * as neo4j from 'neo4j-driver';
import driver from './index';

type DataNode = {
  name: string;
  description: string;
  parentId?: string;
  parent?: string;
};

type DataTree = {
  data: DataNode[];
};

class Migrations {
  private readonly session: neo4j.Session;

  constructor() {
    this.session = driver.session();
  }

  private loadSeedData = async (entry?: DataTree): Promise<void> => {
    const createNodeStatements: string[] = [];
    const createRelationshipsStatements: string[] = [];
    const newNodesList: string[] = [];
    const session = driver.session();
    try {
      const result = await session.run(
        `CREATE ${createNodeStatements} CREATE ${createRelationshipsStatements} WITH ${newNodesList} MATCH relations=()-[:isChildOf]-() RETURN relations`
      );
      console.log('RESULT: ', result);
    } catch (e) {
      console.log('ERROR: ', e);
    } finally {
      await session.close();
    }
    // await driver.close();
  };
}
