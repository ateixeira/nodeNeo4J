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
  const neo4jExec = req.app.get('neo4j');
  const result = await neo4jExec.execute('MATCH(n:Node) RETURN n LIMIT 100');
  const nodes: DataNode[] = result.records.map((r: any) => {
    // eslint-disable-next-line dot-notation
    const data = r['_fields'][0];
    return {
      id: data.identity.low,
      name: data.properties.name,
      description: data.properties.description
    };
  });
  res.send({ nodes });
};
