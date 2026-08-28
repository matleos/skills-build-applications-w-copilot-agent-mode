import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

function createCollectionRouter(model: typeof User) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export const userRoutes = createCollectionRouter(User);
export const teamRoutes = createCollectionRouter(Team);
export const activityRoutes = createCollectionRouter(Activity);
export const leaderboardRoutes = createCollectionRouter(Leaderboard);
export const workoutRoutes = createCollectionRouter(Workout);
