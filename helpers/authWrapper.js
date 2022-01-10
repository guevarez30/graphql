export const adminAuth = (resolver) => (parent, args, context) => {
  if (context.user?.isMasterAdmin) return resolver(parent, args, context);
  throw new Error("Unauthorized");
};

export const userAuth = (resolver) => (parent, args, context) => {
  if (context.user) return resolver(parent, args, context);
  throw new Error("Unauthorized");
};

export const belongsToTeam = (resolver) => async (parent, args, context) => {
  const { team_id } = args;
  const userTeams = await context.models.teamUsers.list({
    where: {
      user_id: context.user.id,
    },
  });

  if (!userTeams.some((x) => x.team_id === team_id))
    throw new Error("Unauthorized");
  return resolver(parent, args, context);
};
