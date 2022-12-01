const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require("cors")
const bodyParser =require("body-parser"); 

async function start() {

    const app = express();
    const httpServer = createServer(app);
    const PORT = 4000;

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql"
    })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
          plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    })

    await server.start()
    
    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
    );

    httpServer.listen(PORT, () => {
        console.log(`Server start on port: ${PORT}`);
    })
}

start()