import { validEmail } from "../../utils/validEmail";

describe("utils validEmail", () => {
  it("returns true if email is not valid", () => {
    expect(validEmail("liivi@test.net")).toBe(true);
  });
  it("returns false if email is not valid", () => {
    expect(validEmail("liivi@test")).toBe(false);
  });
});