export const generateJobModel = ( database ) => {
    const Job = database[ "job" ];
    return {
        create: ( params ) => Job.create({ data: params }),

        getById: ( id ) =>
            Job.findUnique({
                where: {
                    id: id
                }
            }),

        list: ( query ) => Job.findMany( query )
    };
};
