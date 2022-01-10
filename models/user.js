export const generateUserModel = (database) => {
  const User = database["user"];
  return {
    getById: (id) =>
      User.findUnique({
        where: {
          id: id,
        },
      }),

    list: (query) => User.findMany(query),

    create: (params) => User.create({ data: params }),
  };
};
