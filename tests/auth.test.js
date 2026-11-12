
import request from "supertest";
import app from "../src/app.js";

const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "TestPassword123"
};

describe("Authentication API", () => {
  test("should register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);
    expect(response.statusCode).toBe(201);
  });

  test("should reject duplicate email registration", async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    expect([400, 409]).toContain(response.statusCode);
  });

  test("should login with correct credentials", async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("should reject incorrect password", async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword123"
      });

    expect(response.statusCode).toBe(401);
  });
});
