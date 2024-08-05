const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "companyNews", url: "http://localhost:4001" }
      // List of federation-capable GraphQL endpoints...
    ],
  }),
});

const server = new ApolloServer({ gateway });

async function start() {
  const { url } = await startStandaloneServer(server);
  console.log(`🚀  Server ready at ${url}`);
}

start();