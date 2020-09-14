import neo4j, { auth, Driver, driver, Session } from 'neo4j-driver';

export class Neo4j {
  private static driver: Driver = driver(
    'bolt://localhost:7687/',
    auth.basic('neo4j', 'password')
  );

  private static session: Session = Neo4j.driver.session();

  public static execute(request: string) {
    return Neo4j.session.run(request);
  }
}
