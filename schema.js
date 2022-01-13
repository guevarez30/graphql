import { makeExecutableSchema } from "@graphql-tools/schema";

/* Import Custom Resolvers */
import * as jobs from "./resolvers/job.js";
import * as teams from "./resolvers/team.js";
import * as teamUsers from "./resolvers/team_user.js";
import * as users from "./resolvers/users.js";

/* Type definitions */
const typeDefs = `
type PublicUser {
  first_name: String
  last_name: String
  email: String
}

type Query { 
  graph: String 
}

type Mutation {
  graphCreate: String
}
`.concat(jobs.typeDef, teams.typeDef, teamUsers.typeDef, users.typeDef);

/* Resolvers */

/* I really dislike how I am doing this. Any recomendations ? */
const resolvers = {
    Mutation: {
        graphCreate: () => "Create awesome mutations",
        ...users.Mutation,
        ...teams.Mutation,
        ...jobs.Mutation,
        ...teamUsers.Mutation
    },
    Query: {
        graph: () => "Welcome to graphql api",
        ...jobs.Query,
        ...teams.Query,
        ...users.Query
    },
    /* Relationship Mappings */
    ...jobs.relationships,
    ...teams.relationships,
    ...users.relationships
};

export const schema = makeExecutableSchema({
    resolvers,
    typeDefs
});
