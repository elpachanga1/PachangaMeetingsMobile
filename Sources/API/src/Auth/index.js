const jwt = require('jsonwebtoken');
const moment = require('moment');
const error = require('../Utils/error');
const jwtDecode = require('jwt-decode');

const {
  JWT_SECRET
} = process.env;

function verify(token) {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['RS256'],
  });
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);

    const expirationTokenDate = moment(
      decoded.updated_at.replace('T', ' ').replace('Z', '')
    ).format('YYYY-MM-DD HH:mm:ss');

    if (decoded.aud !== owner) {
      throw error('Unable to edit register', 401);
    } else if (moment().isAfter(expirationTokenDate)) {
      throw error('Expired Token', 401);
    }

    console.log(decoded);
    req.body.user = decoded;
  },
  logged: function (req) {
    const decoded = decodeHeader(req);

    const expirationTokenDate = moment(
      decoded.updated_at.replace('T', ' ').replace('Z', '')
    ).format('YYYY-MM-DD HH:mm:ss');

    if (moment().isAfter(expirationTokenDate)) {
      throw error('Expired Token', 401);
    }

    console.log(decoded);
    req.body.user = decoded;
  },
};

function getToken(auth) {
  if (!auth) {
    throw error('Request didnt came with Token', 401);
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Not valid format', 401);
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  //const decoded = verify(token);
  const decoded = jwtDecode(token);

  req.user = decoded;
  return decoded;
}

module.exports = {
  check,
};