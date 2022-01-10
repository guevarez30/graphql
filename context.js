import { database } from "./database.js";

/* Import Models */
import { generateTeamModel } from "./models/team.js";
import { generateUserModel } from "./models/user.js";
import { generateTeamUserModel } from "./models/teamUser.js";
import { generateJobModel } from "./models/job.js";

export const models = {
  teams: generateTeamModel(database),
  teamUsers: generateTeamUserModel(database),
  users: generateUserModel(database),
  jobs: generateJobModel(database),
};
