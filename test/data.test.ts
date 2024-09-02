import { faker } from "@faker-js/faker";

it("should generate random date data", () => {
  const recentDate = faker.date.recent();
  const nearFutureDate = faker.date.soon();

  expect(nearFutureDate.getTime() - recentDate.getTime()).toBeGreaterThan(0);
});
