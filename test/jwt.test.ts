import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { expect, test } from "vitest";

const secret = "shhhhh";

test("jwt token", () => {
  const token = jwt.sign({ name: "Nam" }, secret, {
    noTimestamp: true,
  });

  expect(token).toMatchInlineSnapshot(
    '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmFtIn0.nA_snfndfbvax3E7UiyJUdX8fq76zunD8jDx8Qb9YaA"'
  );

  const valid = jwt.verify(token, secret);

  expect(valid).toMatchInlineSnapshot(`
    {
      "name": "Nam",
    }
  `);

  const fakeToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmkifQ.yxf75wwi2mMWlq31dSMCFCHW-QLBBUQh-4QKF3Zdt3M";

  expect(() =>
    jwt.verify(fakeToken, secret)
  ).toThrowErrorMatchingInlineSnapshot('"invalid signature"');

  expect(jwtDecode(token)).toMatchInlineSnapshot(`
    {
      "name": "Nam",
    }
  `);
});
