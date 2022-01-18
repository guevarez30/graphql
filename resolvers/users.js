import { userAuth, adminAuth } from "../helpers/authWrapper.js";

/* Import Business Logic */
import { createUser } from "../controllers/user.js";

/* Type Def */
export const typeDef = `
type User {
  id: Int!
  first_name: String!
  last_name: String!
  email: String!
  teams: [Team]
}

type PublicUser {
    first_name: String
    last_name: String
    email: String
  }  

extend type Query {
  users: [User!]!
  user: User
}

extend type Mutation{
  createUser(first_name: String!, last_name: String!, email: String!, password: String!): User
}
`;

/* Relationship Mapping */
export const relationships = {
    User: {
        teams: (parent, args, context) =>
            context.models.teamUsers
                .list({ where: { user_id: parent.id } })
                .then((team_users) =>
                    context.models.teams.list({
                        where: {
                            id: {
                                in: team_users.map((x) => x.team_id)
                            }
                        }
                    })
                )
    }
};

/* Query */
export const Query = {
    user: userAuth((_parent, _args, context) =>
        context.models.users.getById(context.user.id)
    ),

    users: adminAuth((_parent, args, context) =>
        context.models.users.list({ where: args })
    )
};

export const Mutation = {
    createUser: createUser
};
