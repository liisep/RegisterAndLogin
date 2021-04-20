import { jwtGenerator } from "../../utils/jwtGenerator";

it("utils jwtGenerator not to be null if id is given", () => {
  expect(jwtGenerator(3)).not.toBeNull();
});