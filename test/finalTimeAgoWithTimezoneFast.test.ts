import { faker } from "@faker-js/faker";

const parseDate = (date: string, timeZone?: string) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour12: false,
    timeZone,
  });

  const parsedParts = formatter
    .formatToParts(new Date(date))
    .reduce<number[]>((acc, cur) => {
      if (Number.isInteger(+cur.value)) {
        acc.push(+cur.value);
      }

      return acc;
    }, []);

  return {
    month: parsedParts[0],
    day: parsedParts[1],
    year: parsedParts[2],
    hour: parsedParts[3],
    minute: parsedParts[4],
  };
};

const finalTimeAgoWithTimezoneFast = (
  past: string,
  from = new Date().toISOString(),
  timeZone?: string
) => {
  const pastDate = new Date(past);

  const parsedPastDate = parseDate(past, timeZone);
  const parsedFromDate = parseDate(from, timeZone);

  const isOnTheSameDay = parsedPastDate.day === parsedFromDate.day;

  //   Same day
  if (isOnTheSameDay) {
    const diffHours = parsedFromDate.hour - parsedPastDate.hour;

    const differenceInMinutes =
      diffHours === 0
        ? parsedFromDate.minute - parsedPastDate.minute
        : parsedFromDate.minute +
          (60 - parsedPastDate.minute) +
          (diffHours - 1) * 60;

    if (differenceInMinutes < 60) {
      const minutes = [0, 1].includes(differenceInMinutes)
        ? "minute"
        : "minutes";

      const differenceMinutesStr =
        differenceInMinutes === 0 ? 1 : differenceInMinutes;

      return `${differenceMinutesStr} ${minutes} ago`;
    }

    const differenceHours = Math.floor(differenceInMinutes / 60);
    const differenceHoursSuffix = [0, 1].includes(differenceHours)
      ? "hour"
      : "hours";
    const differenceHoursStr = differenceHours === 0 ? 1 : differenceHours;

    return `${differenceHoursStr} ${differenceHoursSuffix} ago`;
  }

  const isOnTheSameMonthOfTheYear =
    parsedPastDate.month === parsedFromDate.month &&
    parsedPastDate.year === parsedFromDate.year;

  const differenceInDays = parsedFromDate.day - parsedPastDate.day;

  //   Under a week same month
  if (isOnTheSameMonthOfTheYear && differenceInDays < 7) {
    return differenceInDays === 1
      ? "1 day ago"
      : `${differenceInDays} days ago`;
  }

  //   Under a week different month
  if (!isOnTheSameMonthOfTheYear) {
    // Calculate days to the end of the prev month
    const daysInPrevMonth = new Date(
      pastDate.getFullYear(),
      pastDate.getMonth(),
      0
    ).getDate();
    const daysToPrevMonthEnd = daysInPrevMonth - parsedPastDate.day;

    // Calculate days from the start of the next month
    const daysFromNextMonthStart = parsedFromDate.day;
    const totalDays = daysToPrevMonthEnd + daysFromNextMonthStart;

    if (totalDays < 7) {
      return totalDays === 1 ? "1 day ago" : `${totalDays} days ago`;
    }
  }

  return pastDate.toDateString();
};

describe("finalTimeAgoWithTimezoneFast", () => {
  const rawDateStr = "2024-09-05T10:32:00.223Z";

  it("works on edge cases with timezone", () => {
    const timeZone = "America/Halifax";

    const output = finalTimeAgoWithTimezoneFast(
      "2024-09-05T22:00:00.000Z",
      "2024-09-06T05:00:00.000Z",
      timeZone
    );

    expect(output).toBe("1 day ago");
  });

  it("works on really edge cases", () => {
    const output = finalTimeAgoWithTimezoneFast(
      "2024-09-06T22:00:00.000Z",
      "2024-09-07T05:00:00.000Z"
    );
    expect(output).toBe("7 hours ago");
  });

  it("returns a full date when it is more than 6 days", () => {
    const date = new Date(rawDateStr);
    date.setDate(date.getDate() - 7);
    const output = finalTimeAgoWithTimezoneFast(date.toISOString(), rawDateStr);
    expect(output).toBe("Thu Aug 29 2024");
  });

  it("returns relative time if it's not on the same date and less than 7 days", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomDays = faker.number.int({ min: 1, max: 6 });
      date.setDate(date.getDate() - randomDays);
      const output = finalTimeAgoWithTimezoneFast(
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
      date.setUTCSeconds(date.getUTCSeconds() + randomSeconds);
      const output = finalTimeAgoWithTimezoneFast(
        rawDateStr,
        date.toISOString()
      );
      expect(output).toBe("1 minute ago");
    }
  });

  it("returns relative time if it's on the same date with more than 2 minutes and less than 59 minutes", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomMinutes = faker.number.int({ min: 2, max: 59 });
      date.setUTCMinutes(date.getUTCMinutes() + randomMinutes);
      const output = finalTimeAgoWithTimezoneFast(
        rawDateStr,
        date.toISOString()
      );
      const expected = `${randomMinutes} minutes ago`;
      expect(output).toBe(expected);
    }
  });

  it("returns relative time if it's on the same date with more than 3600 seconds and less than 7200 seconds", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomSeconds = faker.number.int({ min: 3600, max: 7199 });
      date.setUTCSeconds(date.getUTCSeconds() + randomSeconds);
      const output = finalTimeAgoWithTimezoneFast(
        rawDateStr,
        date.toISOString()
      );
      expect(output).toBe("1 hour ago");
    }
  });

  it("returns relative time if it's on the same date with more than 7200 seconds", () => {
    // Loop 1 time to make sure the test is stable
    for (let i = 0; i < 1; i++) {
      const date = new Date(rawDateStr);
      const randomHours = faker.number.int({ min: 2, max: 10 });
      date.setUTCHours(date.getUTCHours() + randomHours);
      const output = finalTimeAgoWithTimezoneFast(
        rawDateStr,
        date.toISOString()
      );
      const expected = `${Math.floor(randomHours)} hours ago`;
      expect(output).toBe(expected);
    }
  });
});
