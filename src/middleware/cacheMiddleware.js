import redis from "../config/redis.js";

const cacheMiddleware = (duration = 60) => {
  return async (req, res, next) => {
    try {
      const version = await redis.get("users:cache:version") || "1";

      const cacheKey =
        `users:list:v${version}:${req.query.page || 1}:${req.query.limit || 10}`;

      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        return res.status(200).json({
          ...JSON.parse(cachedData),
          cached: true
        });
      }

      const originalJson = res.json.bind(res);

      res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redis.set(
            cacheKey,
            JSON.stringify(data),
            "EX",
            duration
          ).catch((error) => {
            console.error("Cache save failed:", error.message);
          });
        }

        return originalJson(data);
      };

      next();
    } catch (error) {
      // If Redis fails, continue without caching
      console.error("Cache read failed:", error.message);
      next();
    }
  };
};

export default cacheMiddleware;