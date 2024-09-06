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

it("should format timestamp", async () => {
  //   expect(format("2024-09-01T19:02:19Z")).toBe("2 days ago");
  //   expect(format("2024-09-02T19:02:19Z")).toBe("1 day ago");
  // expect(formatTimeAgo("2024-09-02T19:02:19Z")).toBe("1 day ago");
  // expect(formatTimeAgo("2024-09-01T19:02:19Z")).toBe("2 day ago");
  // expect(formatTimeAgo("2024-03-01T19:02:19Z")).toBe("186 day ago");
  // const date = new Date();
  // vi.useFakeTimers();
  // vi.advanceTimersByTime(9000);
  // expect(formatTimeAgo(date.toUTCString())).toBe("9 second ago");

  type Item = {
    name: string;
  };

  const list: Item[] = [{ name: "Nam" }];

  const name = list[0]?.name;

  console.log("value: ", name);
});
