import { faker } from "@faker-js/faker";

const rawDateStr = "2024-09-05T22:32:49.223Z";

const formatTimeAgo = (input: string) => {
  const toDate = new Date(input);
  const current = new Date(rawDateStr);

  toDate.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const differenceInMilliseconds = current.getTime() - toDate.getTime();

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsPerDay
  );

  //   Over a week
  if (differenceInDays >= 7) {
    return toDate.toDateString();
  }

  if (differenceInDays > 0 && differenceInDays < 7) {
    return differenceInDays === 1
      ? "1 day ago"
      : `${differenceInDays} days ago`;
  }

  //   Same day
  if (differenceInDays === 0) {
    const toDate = new Date(input);
    const current = new Date(rawDateStr);

    const differenceInMinutes = Math.floor(
      (current.getTime() - toDate.getTime()) / (1000 * 60)
    );

    if (differenceInMinutes < 60) {
      const minutes = [0, 1].includes(differenceInMinutes)
        ? "minute"
        : "minutes";

      const differenceMinutesStr =
        differenceInMinutes === 0 ? 1 : differenceInMinutes;

      return `${differenceMinutesStr} ${minutes} ago`;
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceHours = [0, 1].includes(differenceInHours)
      ? "hour"
      : "hours";
    const differenceHoursStr = differenceInHours === 0 ? 1 : differenceInHours;

    return `${differenceHoursStr} ${differenceHours} ago`;
  }
};

describe("formatTimeAgo", () => {
  it("returns a full date when it is more than 6 days", () => {
    const date = new Date(rawDateStr);
    date.setDate(date.getDate() - 7);
    const output = formatTimeAgo(date.toISOString());
    expect(output).toBe("Thu Aug 29 2024");
  });

  it("returns relative time if it's not on the same date and less than 7 days", () => {
    // Loop 10000 times to make sure the test is stable
    for (let i = 0; i < 10000; i++) {
      const date = new Date(rawDateStr);
      const randomDays = faker.number.int({ min: 1, max: 6 });
      date.setDate(date.getDate() - randomDays);
      const output = formatTimeAgo(date.toISOString());
      const expected =
        randomDays === 1 ? "1 day ago" : `${randomDays} days ago`;
      expect(output).toBe(expected);
    }
  });

  it("returns relative time if it's on the same date with less than or equal to 119 seconds", () => {
    // Loop 10000 times to make sure the test is stable
    for (let i = 0; i < 10000; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 0, max: 119 });
      date.setUTCSeconds(date.getUTCSeconds() - randomSeconds);
      const output = formatTimeAgo(date.toISOString());
      expect(output).toBe("1 minute ago");
    }
  });

  it("returns relative time if it's on the same date with more than 120 seconds and less than 3600 seconds", () => {
    // Loop 10000 times to make sure the test is stable
    for (let i = 0; i < 10000; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 120, max: 3599 });
      date.setUTCSeconds(date.getUTCSeconds() - randomSeconds);
      const output = formatTimeAgo(date.toISOString());
      const expected = `${Math.floor(randomSeconds / 60)} minutes ago`;
      expect(output).toBe(expected);
    }
  });

  it("returns relative time if it's on the same date with more than 3600 seconds and less than 7200 seconds", () => {
    // Loop 10000 times to make sure the test is stable
    for (let i = 0; i < 10000; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 3600, max: 7199 });
      date.setUTCSeconds(date.getUTCSeconds() - randomSeconds);
      const output = formatTimeAgo(date.toISOString());
      expect(output).toBe("1 hour ago");
    }
  });

  it("returns relative time if it's on the same date with more than 7200 seconds", () => {
    // Loop 10000 times to make sure the test is stable
    for (let i = 0; i < 10000; i++) {
      const date = new Date(rawDateStr);
      const randomHours = faker.number.int({ min: 2, max: 10 });
      date.setUTCHours(date.getUTCHours() - randomHours);
      const output = formatTimeAgo(date.toISOString());
      const expected = `${Math.floor(randomHours)} hours ago`;
      expect(output).toBe(expected);
    }
  });
});
