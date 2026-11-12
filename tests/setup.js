
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import redis from "../src/config/redis.js";
import { notificationQueue } from "../src/config/queue.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  // Close BullMQ queue connection
  await notificationQueue.close();

  // Close Redis connection
  if (redis.status !== "end") {
    await redis.quit();
  }

  // Close MongoDB test database
  await mongoose.disconnect();
  await mongoServer.stop();
});
