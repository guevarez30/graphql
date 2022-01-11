import jwt from "jsonwebtoken";

/* Please use env files for secrets */
const SECRET = "secret";

const getUserFromToken = (token, Users) => {
  const decoded = jwt.verify(token, SECRET);
  return Users.list({
    where: {
      email: decoded.email,
    },
  });
};

/* Some hypothetical auth for the master accounts to access and query the database */
export const adminAuth = (resolver) => async (parent, args, context) => {
  const [user] = await getUserFromToken(context.token, context.models.users);
  if (user.id === 3) return resolver(parent, args, context);
  throw new Error("Unauthorized");
};

/* User Specific protected resolvers */
export const userAuth = (resolver) => async (parent, args, context) => {
  const [user] = await getUserFromToken(context.token, context.models.users);
  if (!user) throw new Error("Unauthorized");
  else {
    context.user = user;
    return resolver(parent, args, context);
  }
};

/* User must belong to team to make changes */
export const belongsToTeam = (resolver) => async (parent, args, context) => {
  const { team_id } = args;
  const [user] = await getUserFromToken(context.token, context.models.users);
  if (!user) throw new Error("Unauthorized");

  const userTeams = await context.models.teamUsers.list({
    where: {
      user_id: user.id,
    },
  });

  if (!userTeams.some((x) => x.team_id === team_id))
    throw new Error("Unauthorized");
  return resolver(parent, args, context);
};
