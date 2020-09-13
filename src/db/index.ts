import { auth, driver } from 'neo4j-driver';

/**
 * Neo4j driver configuration
 *
 * Return: configured neo4j driver.
 */
export default driver(
  'bolt://localhost:7687/',
  auth.basic('neo4j', 'password')
);
