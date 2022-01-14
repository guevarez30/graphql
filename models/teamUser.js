export const generateTeamUserModel = ( database ) => {
    const TeamUser = database[ "team_user" ];
    return {
        create: ( params ) => TeamUser.create({ data: params }),

        list: ( query ) => TeamUser.findMany( query )
    };
};
