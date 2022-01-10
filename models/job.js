export const generateJobModel = (database) => {
  const Job = database["job"];
  return {
    getById: (id) =>
      Job.findUnique({
        where: {
          id: id,
        },
      }),

    list: (query) => Job.findMany(query),

    create: (params) => Job.create({ data: params }),
  };
};
