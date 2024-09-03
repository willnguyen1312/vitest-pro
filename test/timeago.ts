export const formatTimeAgo = (input: string): string => {
  const toDate = new Date(input);
  const current = new Date();

  const diffInSeconds = (current.getTime() - toDate.getTime()) / 1000;

  // format it with locale
  return formatDiff(diffInSeconds);
};

const SEC_ARRAY = [
  60, // number of seconds in 1 min
  60, // number of mins in 1 hour
  24, // number of hours in 1 day
  7, // number of days in 1 week
  365 / 7 / 12, // number of weeks in 1 month
  12, // number of months in 1 year
];

export function formatDiff(diff: number): string {
  let idx = 0;

  while (diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length) {
    diff /= SEC_ARRAY[idx];
    idx += 1;
  }

  diff = Math.floor(diff);
  return diff + " " + localeFunc(idx);
}

function localeFunc(index: number): string {
  return [
    "second ago",
    "minute ago",
    "hour ago",
    "day ago",
    "week ago",
    "month ago",
    "year ago",
  ][index];
}
