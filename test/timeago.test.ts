import { formatTimeAgo } from "./timeago";
import { format } from "timeago.js";

describe("timeago", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("should format a minute correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(11 * 1000);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 minute ago");

    expect(format(date.toUTCString())).toBe("11 seconds ago");
    vi.useRealTimers();
  });

  it("should format more than a minute correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(120 * 1000);
    expect(formatTimeAgo(date.toUTCString())).toBe("2 minute ago");
    expect(format(date.toUTCString())).toBe("2 minutes ago");
    vi.useRealTimers();
  });

  it("should format minutes correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(10 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("10 minute ago");
  });

  it("should format an hour correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 hour ago");
  });

  it("should format hours correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(120 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("2 hour ago");
  });

  it("should format a day correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(23 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("23 hour ago");
  });

  it("should format days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(24 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 day ago");
  });

  it("should format few days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(47 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe("1 day ago");
    expect(format(date.toUTCString())).toBe("1 day ago");
  });

  it("should format up to 6 days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(7 * 24 * 60 * 1000 * 60 - 1000);
    expect(formatTimeAgo(date.toUTCString())).toBe("6 day ago");
    expect(format(date.toUTCString())).toBe("6 days ago");
  });

  it("should format up to 7 days correctly", async () => {
    const date = new Date();
    vi.useFakeTimers();
    vi.advanceTimersByTime(7 * 24 * 60 * 1000 * 60);
    expect(formatTimeAgo(date.toUTCString())).toBe(null);
  });
});
