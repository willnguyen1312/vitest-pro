import { format } from "timeago.js";

import { formatTimeAgo } from "./timeago";

// // format timestamp
// format(1544666010224);

// // format date instance
// format(new Date(1544666010224));

// // format date string
// format("2018-12-12");

// // format with locale
// format(1544666010224, "zh_CN");

// // format with locale and relative date
// format(1544666010224, "zh_CN", { relativeDate: "2018-11-11" });

// // e.g.
// format(Date.now() - 11 * 1000 * 60 * 60); // returns '11 hours ago'

describe("timeago", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("should format a minute correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(9000);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 minute ago");
    vi.useRealTimers();
  });

  it("should format minutes correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(10 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("11 minute ago");
  });

  it("should format an hour correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(59 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 hour ago");
  });

  it("should format hours correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(119 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("2 hour ago");
  });

  it("should format a day correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(23 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 day ago");
  });

  it("should format days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(24 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("2 day ago");
  });

  it("should format up to 6 days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(5 * 24 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("6 day ago");
  });

  it("should format up to 6 days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(6 * 24 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe(null);
  });
});
