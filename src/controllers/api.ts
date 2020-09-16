import { Response, Request, NextFunction } from 'express';
import { DataNode } from '../db/migration.types';

/**
 * Neo4j Data Tree api.
 * @route GET /api/tree
 */
export const getTree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query: string = `
    MATCH (p:Node) 
    OPTIONAL MATCH (c)-[:IS_CHILD]->(p) 
    RETURN {name : p.name, description: p.description, parent: p.parent, child: collect( c.name)}
  `;
  const neo4jExec = req.app.get('neo4j');
  const result = await neo4jExec.execute(query);
  // const result = await neo4jExec.execute('MATCH(n:Node) RETURN n LIMIT 100');
  const nodes: DataNode[] = result.records.map((r: any) => {
    // eslint-disable-next-line dot-notation
    const data = r['_fields'][0];
    return {
      name: data.name,
      description: data.description,
      parent: data.parent === 'undefined' ? null : data.parent,
      children: data.child
    };
  });
  res.send({ nodes });
};
