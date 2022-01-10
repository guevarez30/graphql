export async function createTeam(_parent, args, context) {
  const team = await context.models.teams.create(args);
  await context.models.teamUsers.create({
    user_id: context.user.id,
    team_id: team.id,
    role: "admin",
  });
  return team;
}
