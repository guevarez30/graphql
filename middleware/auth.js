import jwt from "jsonwebtoken";

/* Please set this in a .env file */
const SECRET = "secret";

export const userAuth = (database) => async (req, res, done) => {
  const token = req.headers["token"];
  try {
    const decoded = jwt.verify(token, SECRET);
    const [user] = await database["user"].findMany({
      where: {
        AND: [{ email: decoded.email }, { password: decoded.password }],
      },
    });
    /* Build out other auth strategies to protect your resolvers */
    user.isMasterAdmin = user.id === 1;
    req.user = user;
    done();
  } catch (err) {
    res.status(401).send(err);
  }
};

export const logIn = (database) => async (req, res) => {
  const { email, password } = req.body;
  /* Please use password encryption */
  const [user] = await database["user"].findMany({
    where: {
      AND: {
        email: email,
        password: password,
      },
    },
  });

  if (!user) {
    res.sendStatus(401);
  } else {
    const token = jwt.sign(
      { email: user.email, password: user.password },
      SECRET,
      { expiresIn: "10h" }
    );
    res.cookie("token", token);
    res.sendStatus(200);
  }
};
