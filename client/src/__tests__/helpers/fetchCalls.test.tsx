import { fetchGetData, fetchPostData } from "../../helpers/fetchCalls";
import { fakeToken, fakeUser, fakeUserLogin } from "../../fixtures";
import { rest, server } from "../../testServer";

afterEach(() => jest.clearAllMocks());

describe("API calls:", () => {
  it("should register a user", async() => {
    await fetchPostData("http://localhost:5000/auth/register", fakeUser).then((data) => {
      expect(data.headers).toStrictEqual(fakeToken);
    });
  });

  it("should login a user", async() => {
    await fetchPostData("http://localhost:5000/auth/login", fakeUserLogin).then((data) => {
      expect(data.headers).toStrictEqual(fakeToken);
    });
  });

  it("should verify token", async() => {
    await fetchGetData("http://localhost:5000/auth/is-verify", "GET", {jwt_token: "fake_token"}).then((data) => {
      expect(data[0].message).toBe(true);
    });
  });

  it("should not verify token", async() => {
    server.use(
      rest.get("http://localhost:5000/auth/is-verify", ((req, res, context) => {
        return res(context.status(403), context.json({ error: "Not authorized!" }));
      }))
    );
    await fetchGetData("http://localhost:5000/auth/is-verify", "GET", {jwt_token: "fake_tokens"}).then((data) => {
      expect(data.error).toBe("Not authorized!");
    });
  });

  it("should get user data", async() => {
    const userData = {id: 3, firstName: "Silvi", lastName: "Mets", email: "silvi@test.net"};
    await fetchGetData("http://localhost:5000/dashbrd/", "GET", {jwt_token: "fake_token"}).then((data) => {
      expect(data).toStrictEqual(userData);
    });
  });

  it("should not get user data", async() => {
    server.use(
      rest.get("http://localhost:5000/dashbrd/", ((req, res, context) => {
        return res(context.status(403), context.json({ error: "Not authorized!" }));
      }))
    );
    await fetchGetData("http://localhost:5000/dashbrd/", "GET", {jwt_token: "fake_tokens"}).then((data) => {
    expect(data.error).toBe("Not authorized!");
    });
  });
});