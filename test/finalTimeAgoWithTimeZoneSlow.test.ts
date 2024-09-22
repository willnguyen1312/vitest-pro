import { faker } from "@faker-js/faker";

const halifaxTimeZone = "America/Halifax";

function changeTimezone(date: Date, timeZone = halifaxTimeZone) {
  const dateWithTimeZone = new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );

  return new Date(dateWithTimeZone.getTime());
}

const finalTimeAgoWithTimeZoneSlow = (past: string, from: string) => {
  const toDate = changeTimezone(new Date(past));
  const current = changeTimezone(new Date(from));

  // const toDate = new Date(past);
  // const current = new Date(from);

  const isSameDay =
    toDate.getFullYear() === current.getFullYear() &&
    toDate.getMonth() === current.getMonth() &&
    toDate.getDate() === current.getDate();

  //   Same day
  if (isSameDay) {
    const toDate = new Date(past);
    const current = new Date(from);

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

  const isSameMonthOfTheTime =
    toDate.getMonth() === current.getMonth() &&
    toDate.getFullYear() === current.getFullYear();

  const differenceInDays = current.getDate() - toDate.getDate();

  //   Under a week same month
  if (isSameMonthOfTheTime && differenceInDays < 7) {
    return differenceInDays === 1
      ? "1 day ago"
      : `${differenceInDays} days ago`;
  }

  //   Under a week different month
  if (!isSameMonthOfTheTime) {
    // Calculate days to the end of the prev month
    const daysInPrevMonth = new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      0
    ).getDate();
    const daysToPrevMonthEnd = daysInPrevMonth - toDate.getDate();

    // Calculate days from the start of the next month
    const daysFromNextMonthStart = current.getDate();
    const totalDays = daysToPrevMonthEnd + daysFromNextMonthStart;

    if (totalDays < 7) {
      return totalDays === 1 ? "1 day ago" : `${totalDays} days ago`;
    }
  }

  return toDate.toDateString();
};

describe("finalTimeAgoWithTimeZoneSlow", () => {
  const rawDateStr = "2024-09-05T22:32:49.223Z";

  it("works on really edge cases", () => {
    const output = finalTimeAgoWithTimeZoneSlow(
      "2024-09-06T19:00:00.000Z",
      "2024-09-07T02:00:00.000Z"
    );
    expect(output).toBe("7 hours ago");
  });

  it("returns a full date when it is more than 6 days", () => {
    const date = new Date(rawDateStr);
    date.setDate(date.getDate() - 7);
    const output = finalTimeAgoWithTimeZoneSlow(date.toISOString(), rawDateStr);
    expect(output).toBe("Thu Aug 29 2024");
  });

  it("returns relative time if it's not on the same date and less than 7 days", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomDays = faker.number.int({ min: 1, max: 6 });
      date.setDate(date.getDate() - randomDays);
      const output = finalTimeAgoWithTimeZoneSlow(
        date.toISOString(),
        rawDateStr
      );
      const expected =
        randomDays === 1 ? "1 day ago" : `${randomDays} days ago`;
      expect(output).toBe(expected);
    }
  });

  it("returns relative time if it's on the same date with less than or equal to 119 seconds", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 0, max: 119 });
      date.setUTCSeconds(date.getUTCSeconds() - randomSeconds);
      const output = finalTimeAgoWithTimeZoneSlow(
        date.toISOString(),
        rawDateStr
      );
      expect(output).toBe("1 minute ago");
    }
  });

  it("returns relative time if it's on the same date with more than 120 seconds and less than 3600 seconds", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 120, max: 3599 });
      date.setUTCSeconds(date.getUTCSeconds() - randomSeconds);
      const output = finalTimeAgoWithTimeZoneSlow(
        date.toISOString(),
        rawDateStr
      );
      const expected = `${Math.floor(randomSeconds / 60)} minutes ago`;
      expect(output).toBe(expected);
    }
  });

  it("returns relative time if it's on the same date with more than 3600 seconds and less than 7200 seconds", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 3600, max: 7199 });
      date.setUTCSeconds(date.getUTCSeconds() - randomSeconds);
      const output = finalTimeAgoWithTimeZoneSlow(
        date.toISOString(),
        rawDateStr
      );
      expect(output).toBe("1 hour ago");
    }
  });

  it("returns relative time if it's on the same date with more than 7200 seconds", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomHours = faker.number.int({ min: 2, max: 10 });
      date.setUTCHours(date.getUTCHours() - randomHours);
      const output = finalTimeAgoWithTimeZoneSlow(
        date.toISOString(),
        rawDateStr
      );
      const expected = `${Math.floor(randomHours)} hours ago`;
      expect(output).toBe(expected);
    }
  });
});
