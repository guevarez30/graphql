const allowedRoles = [ "admin", "user", "reader" ];

export async function createTeamUser(
    _parent,
    { user_id, team_id, role },
    context
) {
    const [ user, team ] = await Promise.all([
        context.models.users.getById( user_id ),
        context.models.teams.getById( team_id )
    ]);
    if ( !team ) throw Error( `Team Doesnt Exist` );
    else if ( !user ) throw Error( `User Doesnt Exist` );
    else if ( !allowedRoles.includes( role ) )
        throw Error( `Allowed roles are admin, user, reader` );
    else {
        const [ teamUser ] = await context.models.teamUsers.list({
            where: {
                AND: [ { user_id: user_id }, { team_id: team_id } ]
            }
        });
        if ( teamUser ) throw Error( `User already on team` );
        return context.models.teamUsers.create({
            role:    role,
            team_id: team_id,
            user_id: user_id
        });
    }
}
