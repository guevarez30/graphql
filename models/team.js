export const generateTeamModel = ( database ) => {
    const Team = database[ "team" ];
    return {
        create: ( params ) => Team.create({ data: params }),

        getById: ( id ) =>
            Team.findUnique({
                where: {
                    id: id
                }
            }),

        list: ( query ) => Team.findMany( query )
    };
};
