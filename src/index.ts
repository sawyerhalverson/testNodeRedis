import Redis from 'ioredis';

// Define a function to check if Redis is ready
const checkRedisReady = async (redisUrl: string) => {
  return new Promise<void>((resolve, reject) => {
    const redis = new Redis(redisUrl);

    redis.on('connect', () => {
      console.log('Connected to Redis!');
      resolve(); // Connection is successful, resolve the promise
    });

    redis.on('error', (err) => {
      console.error('Error with Redis:', err);
      reject(new Error('Failed to connect to Redis.'));
    });

    // Set a timeout in case Redis never connects (to avoid hanging forever)
    setTimeout(() => {
      reject(new Error('Redis connection timed out.'));
    }, 5000); // Timeout after 5 seconds (adjust as needed)
  });
};

const startServer = async () => {
  try {
    // First, use REDIS_PUBLIC_URL to allow the build process to complete.
    const redisUrl = process.env.REDIS_PUBLIC_URL || 'redis://localhost:6379'; // Fallback for local testing
    console.log('Using Redis public URL for initial connection: ', redisUrl);

    // Wait for Redis to be ready before starting the server
    await checkRedisReady(redisUrl);

    // Now that Redis is connected, use the private Redis URL for subsequent requests
    const privateRedisUrl = process.env.REDIS_URL || 'redis://localhost:6379'; // Fallback for local testing
    console.log('Switching to Redis private URL for runtime: ', privateRedisUrl);

    // Now that the app is ready, establish connection using the private Redis URL
    await checkRedisReady(privateRedisUrl);

    // App is fully up and Redis is connected, proceed with your application logic
    console.log('App is ready to handle traffic!');
    
    // Example: Start your HTTP server (e.g., using Express)
    // app.listen(PORT, () => {
    //   console.log(`Server is running on http://localhost:${PORT}`);
    // });

  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
