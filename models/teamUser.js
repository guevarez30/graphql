export const generateTeamUserModel = (database) => {
  const TeamUser = database["team_user"];
  return {
    list: (query) => TeamUser.findMany(query),

    create: (params) => TeamUser.create({ data: params }),
  };
};
