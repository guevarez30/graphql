/* import business logic */
import { createTeam } from "../controllers/team.js";

/* Type Def */
export const typeDef = `
type Team {
  id: Int!
  name: String
  category: String
  users: [PublicUser]
  jobs: [Job]
}

extend type Query {
  teams(id: Int, name: String, category: String): [Team!]!
}

extend type Mutation{
  createTeam(name: String!, category: String): Team
}
`;

/* Relationship Mapping */
export const relationships = {
    Team: {
        jobs: (parent, args, context) =>
            context.models.jobs.list({
                where: {
                    team_id: parent.id,
                    ...args
                }
            }),

        users: (parent, args, context) =>
            context.models.teamUsers
                .list({
                    where: {
                        team_id: parent.id
                    }
                })
                .then((teamUsers) =>
                    context.models.users.list({
                        where: {
                            id: {
                                in: teamUsers.map((x) => x.user_id)
                            },
                            ...args
                        }
                    })
                )
    }
};

/* Query */
export const Query = {
    teams: (_parent, args, context) =>
        context.models.teams.list({ where: args })
};

export const Mutation = {
    createTeam: createTeam
};
