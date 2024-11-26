import Redis from 'ioredis';

// Get the Redis connection string from the environment variable (using REDIS_PUBLIC_URL for Railway)
const redisUrl = process.env.REDIS_PUBLIC_URL || 'redis://localhost:6379'; // Fallback to localhost for local testing

// Create a new Redis instance with the connection string
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
    // Wait for Redis to connect
    await new Promise<void>((resolve, reject) => {
      redis.on('connect', resolve);
      redis.on('error', reject);
    });

    // Your app logic here...
    console.log('App is ready to handle traffic!');
    
    // Start your HTTP server (if you're using Express, for example)
    // Assuming you have an Express app, you can start it like this:
    // app.listen(PORT, () => {
    //   console.log(`Server is running on http://localhost:${PORT}`);
    // });

  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
