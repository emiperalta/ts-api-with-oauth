import { auth, requiredScopes  } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL
})

app.get('/api/public', (req, res) => {
  return res.json({ msg: 'hello world in public' });
});

app.get('/api/private', checkJwt, (req, res) => {
  return res.json({ msg: 'hello world in private' });
});

const checkScopes = requiredScopes('read:posts');

app.get('/api/private-scoped', checkJwt, checkScopes, (req, res) => {
  return res.json({ msg: 'hello world in private with scopes' });
});

app.listen(3000, () => console.log('server running at http://localhost:3000'))