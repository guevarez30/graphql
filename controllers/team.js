export async function createTeam( _parent, args, context ) {
    const team = await context.models.teams.create( args );
    await context.models.teamUsers.create({
        role:    "admin",
        team_id: team.id,
        user_id: context.user.id
    });
    return team;
}
