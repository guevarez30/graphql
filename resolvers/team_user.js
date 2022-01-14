import { belongsToTeam } from "../helpers/authWrapper.js";

/* import business logic */
import { createTeamUser } from "../controllers/teamUser.js";

/* Type Def */
export const typeDef = `
type TeamUser{
  id: Int!
  role: String!
  team_id: Int!
  user_id: Int!
}

extend type Mutation{
  addUserToTeam(user_id: Int!, team_id: Int!, role: String!): TeamUser
}
`;

export const Mutation = {
    addUserToTeam: belongsToTeam(createTeamUser)
};
