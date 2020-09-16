# NodeJS - Neo4J

This is a case study of a first contact with Neo4J.
It is implemented using NodeJS, Express and TypeScript.

## Requirements

Please make sure that you have Node.js, npm and Docker installed on your system.

- NodeJS
- npm
- Docker

## Setup

### Dependencies

Once you have the project cloned and everything is in order, please install all required npm modules
by using the command:

```sh
npm install
```

### Database

If you have a Neo4J instance on your local environment, you can use it by adjusting the connection information on the config.json file.

If not, you can also spin up a containered version of Neo4j by using the command:

```sh
docker-compose up neo4j
```

### Data

After your database is ready, seed data from the file seed.json can be loaded into it with the command:

```sh
npm run migrate
```

### Execute

To build the project, please type

```sh
npm run build
```

To start the project, please type

```sh
npm run start
```

and navigate to [http://localhost:3000/](http://localhost:3000) (or use the port specified in corresponding environment variable)

```sh
http://localhost:3000
```

The data served bu the api can be viewed under the endpoint /api/tree.

```sh
http://localhost:3000/api/tree
```
