import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen' },
      { username: 'jon-bell', email: 'jon.bell@example.com', displayName: 'Jon Bell' },
      { username: 'priya-shah', email: 'priya.shah@example.com', displayName: 'Priya Shah' },
      { username: 'leo-martins', email: 'leo.martins@example.com', displayName: 'Leo Martins' },
    ]);

    await Team.create([
      {
        name: 'Morning Momentum',
        description: 'A friendly team for consistent early workouts.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Weekend Warriors',
        description: 'Long rides, trail runs, and weekend challenges.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Run', durationMinutes: 35, completedAt: new Date('2026-08-25T07:15:00Z') },
      { user: users[1]._id, type: 'Strength training', durationMinutes: 45, completedAt: new Date('2026-08-25T06:45:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 60, completedAt: new Date('2026-08-24T09:00:00Z') },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 30, completedAt: new Date('2026-08-23T10:30:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 860, rank: 1 },
      { user: users[2]._id, points: 740, rank: 2 },
      { user: users[1]._id, points: 625, rank: 3 },
      { user: users[3]._id, points: 510, rank: 4 },
    ]);

    await Workout.create([
      {
        title: 'Foundation Run',
        description: 'Build an aerobic base with an easy, conversational pace.',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        title: 'Full-body Strength Circuit',
        description: 'A balanced circuit focused on form, control, and core stability.',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        title: 'Power Intervals',
        description: 'Short, challenging intervals to improve speed and cardiovascular power.',
        difficulty: 'advanced',
        durationMinutes: 40,
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
