import { Response } from "express";
import request from "supertest";
import defaults from "superagent-defaults";
import { app } from "../index";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const authRoutes: NodeRequire = require("../routes/authRoutes");
const dashboardRoute: NodeRequire = require("../routes/dashboardRoute");
let jwt_token: string;
app.use("/auth", authRoutes);
app.use("/dashbrd", dashboardRoute);

describe("dashboard endpoint", () => {
  it("First register user", (done) => {
    request(app)
      .post("/auth/register").send({
        firstName: "Teet",
        lastName: "Test",
        email: "teet@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(200);
        done();
      })
  });

  it("Then login user", (done) => {
    request(app)
      .post("/auth/login").send({
        email: "teet@test.net",
        password: "12Kj0p9"
      })
      .then((response: any) => {
        expect(response.status).toBe(200);
        jwt_token = JSON.parse(response.text).jwt_token;
        done();
      })
  });

  it("returns 200 and first name if correct token exist", (done) => {
    const commonHeaders: Object = { "jwt_token": jwt_token };
    defaults(request(app))
      .get("/dashbrd").set(commonHeaders)
      .then((response: any) => {
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).firstName).toBe("Teet");
        done();
      });
  });

  it("returns 403 if correct token not exist", (done) => {
    const commonHeaders: Object = { "jwt_token": "27123ugdhs78sbi" };
    defaults(request(app))
      .get("/dashbrd").set(commonHeaders)
      .then((response: any) => {
        expect(response.status).toBe(403);
        expect(response.text).toBe("\"Not authorized!\"");
        done();
      })
      .then(async() => {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("email = :email", { email: "teet@test.net" })
          .execute();
      });
  });
});