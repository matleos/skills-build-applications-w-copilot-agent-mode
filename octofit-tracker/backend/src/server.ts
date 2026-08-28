import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import {
  activityRoutes,
  leaderboardRoutes,
  teamRoutes,
  userRoutes,
  workoutRoutes,
} from './routes.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (_request, response) => {
response.json({
name: 'OctoFit Tracker API',
health: `${apiBaseUrl}/api/health`,
resources: [
`${apiBaseUrl}/api/users`,
`${apiBaseUrl}/api/teams`,
`${apiBaseUrl}/api/activities`,
`${apiBaseUrl}/api/leaderboard`,
`${apiBaseUrl}/api/workouts`,
],
});
});



app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', apiBaseUrl });
});

app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/workouts', workoutRoutes);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Request failed' });
});

void connectDatabase();
app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});