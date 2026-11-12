
import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";

const testUser = {
  name: "Test User",
  email: "protected@example.com",
  password: "TestPassword123"
};

const registerUser = async () => {
  const response = await request(app)
    .post("/api/v1/auth/register")
    .send(testUser);

  return response.body.token;
};

describe("JWT Authentication and RBAC", () => {
  test("should reject access without a token", async () => {
    const response = await request(app)
      .get("/api/v1/users/profile");

    expect(response.statusCode).toBe(401);
  });

  test("should allow an authenticated user to access their profile", async () => {
    const token = await registerUser();

    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

  test("should reject normal users from admin routes", async () => {
    const token = await registerUser();

    const response = await request(app)
      .get("/api/v1/admin/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });

  test("should allow admin users to access admin routes", async () => {
    await registerUser();

    // Promote the test user directly in the test database.
    await User.updateOne(
      { email: testUser.email },
      { $set: { role: "admin" } }
    );

    // Login again to obtain a token after promotion.
    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password
      });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get("/api/v1/admin/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

