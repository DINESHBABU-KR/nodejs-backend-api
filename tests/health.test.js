
import request from "supertest";
import app from "../src/app.js";

describe("Health API", () => {
  test("should return API running status", async () => {
    const response = await request(app)
      .get("/api/v1/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("API is running");
  });
});

