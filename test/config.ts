export const userA = {
  firstName: 'a',
  lastName: 'a',
  fullName: 'a a',
  email: 'a',
  password: 'a',
  id: undefined,
  token: undefined
}

export const userB = {
  firstName: 'b',
  lastName: 'b',
  email: 'b',
  password: 'b',
  fullName: 'b b',
  id: undefined,
  token: undefined
}

export const trustA = {
  name: 'A trust',
  key: encodeURIComponent('A trust'),
  description: 'idk',
  id: undefined
}

import 'mocha';
import 'chai/register-should';

import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import * as chaiThings from 'chai-things';
import * as chaiSubset from 'chai-subset';
chai.use(chaiHttp);
chai.use(chaiThings);
chai.use(chaiSubset);
export const request = chai.request('http://localhost:4000');

import * as mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/test');
