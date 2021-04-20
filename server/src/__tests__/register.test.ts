import request from "supertest";
import { app } from "../index";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const authRoutes: NodeRequire = require("../routes/authRoutes");
app.use("/auth", authRoutes);

describe("Register user endpoint", () => {
  it("returns 401 if missing credentials", (done) => {
    request(app)
      .post("/auth/register").send({
        firstName: "Liivi",
        lastName: "",
        email: "liivi@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(401);
        expect(response.text).toBe("\"Missing Credentials!\"");
        done();
      });
  });

  it("returns 401 if invalid email", (done) => {
    request(app)
      .post("/auth/register").send({
        firstName: "Liivi",
        lastName: "Test",
        email: "liivi@test",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(401);
        expect(response.text).toBe("\"Invalid Email!\"");
        done();
      });
  });

  it("returns 200 if register request is valid", (done) => {
    request(app)
      .post("/auth/register").send({
        firstName: "Liivi",
        lastName: "Test",
        email: "liivi@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it("returns 401 if user already registered", (done) => {
    request(app)
      .post("/auth/register").send({
        firstName: "Liivi",
        lastName: "Test",
        email: "liivi@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(401);
        expect(response.text).toBe("\"User already exist!\"");
        done();
      })
      .then(async() => {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("email = :email", { email: "liivi@test.net" })
          .execute();
      });
  });
});