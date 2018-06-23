import { Router } from 'express';
import { verify } from 'jsonwebtoken';
let api = Router();

global['secret'] = 'jsdjrfozej654541fkn';

api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type,x-access-token');
  next();
});

api.use('/authentication', require('./authentication'));

api.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Max-Age': '86400', // 24 hours
        'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, x-access-token',
        'Access-Control-Allow-Credentials': false
      };
      // IE8 does not allow domains to be specified, just the *
      // headers['Access-Control-Allow-Origin'] = req.headers.origin;
      res.writeHead(200, headers);
      res.end();
  } else {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      verify(token, global['secret'], (err, decoded) => {
         if (err) {
           return res.status(403).json('Failed to authenticate token.');
         } else {
           // if everything is good, save to request for use in other routes
           req.decoded = decoded;
           next();
         }
       });
    } else {
      return res.status(403).json('No token provided.');
    }
  }
});

api.use('/user', require('./user'));
api.use('/posting', require('./posting'));
api.use('/trusting', require('./trusting'));
api.use('/friends', require('./friends'));

module.exports = api;
