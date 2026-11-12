import { Worker } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null
};

const worker = new Worker(
  "notifications",
  async (job) => {
    console.log("Processing job:", job.name);

    const { name, email } = job.data;

    // Placeholder for actual email integration
    console.log(`Welcome notification for ${name} (${email})`);

    return {
      success: true,
      message: "Notification job processed"
    };
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error.message);
});

console.log("Notification worker started");