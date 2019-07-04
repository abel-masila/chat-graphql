const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema, graphql } = require("graphql");

const app = express();

const db = {
  users: [
    {
      id: "1",
      email: "abel@mail.com",
      name: "masila",
      avatarUrl: "http://ss.com"
    },
    {
      id: "2",
      email: "ken@mail.com",
      name: "Ken",
      avatarUrl: "http://ss.com"
    },
    {
      id: "3",
      email: "ben@mail.com",
      name: "Ben",
      avatarUrl: "http://ss.com"
    }
  ]
};

const schema = buildSchema(`
 type Query {
     users:[User!]!
 }
 type User {
      id: ID!
      email:String!
      name:String
      avatarUrl:String
 }
`);

const rootValue = {
  users: () => db.users
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);
app.listen(3000, () => console.log("Listening on 3000"));
