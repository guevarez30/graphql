import { hash } from "../helpers/encryption.js";

export const createUser = async (_parent, { password, ...user }, context) => {
  /* Deny anyone with email */
  const [userExists] = await context.models.users.list({
    where: {
      email: user.email,
    },
  });

  if (userExists) throw Error("User Exists");

  /* Please encrypt password for actual api */
  user.password = await hash(password);
  const newUser = await context.models.users.create(user);

  /* Give my user a team */
  const team = await context.models.teams.create({
    name: `${newUser.first_name} ${newUser.last_name} team`,
  });

  // /* Give my user a team_user */
  await context.models.teamUsers.create({
    user_id: newUser.id,
    team_id: team.id,
    role: "admin",
  });

  return newUser;
};
