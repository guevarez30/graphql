export const generateTeamModel = (database) => {
  const Team = database["team"];
  return {
    getById: (id) =>
      Team.findUnique({
        where: {
          id: id,
        },
      }),

    list: (query) => Team.findMany(query),

    create: (params) => Team.create({ data: params }),
  };
};
