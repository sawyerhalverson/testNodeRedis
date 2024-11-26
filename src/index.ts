import Redis from 'ioredis';

// Redis connection string from environment variable
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

// Connect to Redis when app starts
const redis = new Redis(redisUrl);

redis.on('connect', () => {
  console.log('Connected to Redis!');
});

redis.on('error', (err) => {
  console.error('Error with Redis:', err);
});

// Example of your server start logic
const startServer = async () => {
  try {
    // Wait for Redis to be ready before starting server
    await redis.connect();

    // Your app logic here...
    console.log('App is ready to handle traffic!');
    // Start your HTTP server, etc.

  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
