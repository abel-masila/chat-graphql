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
  ],
  messages: [
    {
      id: "1",
      userId: "1",
      body: "Hello home!",
      createdAt: Date.now()
    },
    {
      id: "2",
      userId: "2",
      body: "Nice Code!",
      createdAt: Date.now()
    },
    {
      id: "3",
      userId: "3",
      body: "Sure. Masterpiece!",
      createdAt: Date.now()
    },
    {
      id: "4",
      userId: "3",
      body: "Adios bro!",
      createdAt: Date.now()
    }
  ]
};

class User {
  constructor(user) {
    Object.assign(this, user);
  }
  get messages() {
    return db.messages.filter(message => message.userId === this.id);
  }
}

const schema = buildSchema(`
 type Query {
     users:[User!]!
     user(id: ID!) : User
     messages:[Message!]!
 }
 type User {
      id: ID!
      email:String!
      name:String
      avatarUrl:String
      messages:[Message!]!
 }
 type Message {
   id:ID!
   body:String
   createdAt:String
 }
 type Mutation {
   addUser(email:String!,name:String) : User
 }
`);

const rootValue = {
  users: () => db.users.map(user => new User(user)),
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
  user: args => db.users.find(user => user.id === args.id),
  messages: () => db.messages
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
