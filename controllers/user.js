export const createUser = async (_parent, args, context) => {
  /* Deny anyone with email */
  const [userExists] = await context.models.users.list({
    where: {
      email: args.email,
    },
  });

  if (userExists) throw Error("User Exists");

  /* Please encrypt password for actual api */
  const user = await context.models.users.create(args);

  /* Give my user a team */
  const team = await context.models.teams.create({
    name: `${user.first_name} ${user.last_name} team`,
  });

  /* Give my user a team_user */
  await context.models.teamUsers.create({
    user_id: user.id,
    team_id: team.id,
    role: "admin",
  });

  return user;
};
