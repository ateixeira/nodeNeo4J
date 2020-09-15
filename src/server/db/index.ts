import * as neo4j from 'neo4j-driver';
import { auth, Driver, driver, Session } from 'neo4j-driver';

export class Neo4j {
  private readonly config: any;

  private driver: neo4j.Driver;

  private session: neo4j.Session;

  constructor(config: any) {
    this.config = config;
    this.driver = this.getDriver();
    this.session = this.driver.session();
  }

  private getDriver = (): Driver => {
    return driver(
      this.config.uri,
      auth.basic(this.config.user, this.config.password)
    );
  };

  private async cleanDB(): Promise<void> {
    this.execute('MATCH (n) DETACH DELETE n');
  }

  public async execute(request: string): Promise<neo4j.Result> {
    return this.session.run(request);
  }
}
