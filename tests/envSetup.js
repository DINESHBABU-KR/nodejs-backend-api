import "dotenv/config";

// Use a dedicated secret for automated tests.
process.env.JWT_SECRET = "test-only-jwt-secret-for-jest";
process.env.JWT_EXPIRES_IN = "1d";
