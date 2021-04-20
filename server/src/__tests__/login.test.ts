import request from "supertest";
import { app } from "../index";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const authRoutes: NodeRequire = require("../routes/authRoutes");
app.use("/auth", authRoutes);

describe("Login user endpoint", () => {
  it("First register user", (done) => {
    request(app)
      .post("/auth/register").send({
        firstName: "Siiri",
        lastName: "Test",
        email: "siiri@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it("returns 401 if user don't exist", (done) => {
    request(app)
      .post("/auth/login").send({
        email: "miina@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(401);
        expect(response.text).toBe("\"This email is not registered yet!\"");
        done();
      })
  });

  it("returns 200 if login request is valid", (done) => {
    request(app)
      .post("/auth/login").send({
        email: "siiri@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(200);
        expect(response.text).toMatch(/jwt_token/i);
        done();
      })
      .then(async() => {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("email = :email", { email: "siiri@test.net" })
          .execute();
      });
  });
});