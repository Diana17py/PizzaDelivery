const { User } = require('../models'); 
const jwt = require("jsonwebtoken");

exports.checkJWT = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "diana kravets super secret key", async (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ status: false, code: 401, error: "invalid Token" });
      } else {
        const user = await User.findByPk(decodedToken.userId);
        if (user) {
          const userId = parseInt(user.id);
          req.decodedUserId = userId;

          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp - currentTime < 60 * 5) { 
            const newToken = jwt.sign(
              {userId},
              "diana kravets super secret key",
              {
                expiresIn: "5m",
              }
            );
            res.cookie("jwt", newToken, {
              withCredentials: true,
              httpOnly: false,
              maxAge: 300 * 1000,
            });
          }

          next();
        } else {
          res.status(401).json({ status: false, code: 401, error: "invalid Token" });
        }
      }
    });
  } else {
    return res.status(401).json({ status: false, code: 401, error: "invalid Token" });
  }
};
