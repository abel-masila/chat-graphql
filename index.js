const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema, graphql } = require("graphql");
const crypto = require("crypto");

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
     user(id: ID!) : User
 }
 type User {
      id: ID!
      email:String!
      name:String
      avatarUrl:String
 }
 type Mutation {
   addUser(email:String!,name:String) : User
 }
`);

const rootValue = {
  users: () => db.users,
  addUser: ({ email, name }) => {
    const user = {
      id: crypto.randomBytes(10).toString("hex"),
      name,
      email,
      avatarUrl: "http://ddd.com"
    };
    db.users.push(user);
    return user;
  },
  user: args => db.users.find(user => user.id === args.id)
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
