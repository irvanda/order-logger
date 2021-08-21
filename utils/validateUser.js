const jwt = require('jsonwebtoken');
require('dotenv').config();
const { TOKEN_KEY } = process.env;

const ValidateUser = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).send({
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized',
      },
    });

  try {
    const decode = jwt.verify(token, TOKEN_KEY);
    if (decode) return true;
  } catch (err) {
    if (err)
      return res.status(403).send({ success: false, error: { code: 403, message: `Forbidden, ${err.message}` } });
  }
};

module.exports = ValidateUser;
