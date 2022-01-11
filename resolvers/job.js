import { belongsToTeam, adminAuth } from "../helpers/authWrapper.js";

/* Type Def */
export const typeDef = `
type Job {
  id: Int!
  description: String
  team: Team
}

extend type Query {
  jobs(id: Int, name: String, team_id: Int): [Job]!
}

extend type Mutation {
  createJob(team_id: Int, description: String): Job!
}
`;

/* Relationship Mapping */
export const relationships = {
  Job: {
    team: (parent, _args, context) =>
      context.models.teams.getById(parent.team_id),
  },
};

/* Query */
export const Query = {
  jobs: (_parent, args, context) => context.models.jobs.list({ where: args }),
};

/* Mutations */
export const Mutation = {
  createJob: belongsToTeam((_parent, args, context) =>
    context.models.jobs.create(args)
  ),
};
