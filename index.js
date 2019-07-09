const { ApolloServer, gql } = require("apollo-server");

const crypto = require("crypto");

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

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }
  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }
  type Message {
    id: ID!
    body: String
    createdAt: String
  }
  type Mutation {
    addUser(email: String!, name: String): User
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    messages: () => db.messages,
    user: (root, { id }) => db.users.find(user => user.id === id)
  },
  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString("hex"),
        name,
        email,
        avatarUrl: "http://ddd.com"
      };
      db.users.push(user);
      return user;
    }
  },
  User: {
    messages: user => db.messages.filter(message => message.userId === user.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
