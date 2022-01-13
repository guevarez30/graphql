export const generateUserModel = ( database ) => {
    const User = database[ "user" ];
    return {
        create: ( params ) => User.create({ data: params }),

        getById: ( id ) =>
            User.findUnique({
                where: {
                    id: id
                }
            }),

        list: ( query ) => User.findMany( query )
    };
};
