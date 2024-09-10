export const formatTimeAgo = (input: string): string => {
  const toDate = new Date(input);
  const current = new Date();

  const diffInSeconds = (current.getTime() - toDate.getTime()) / (1000 * 60);

  const isOverAWeek = diffInSeconds > 7 * 24 * 60;

  // format it with locale
  return isOverAWeek ? null : formatDiff(diffInSeconds);
};

const SEC_ARRAY = [
  60, // number of mins in 1 hour
  24, // number of hours in 1 day
  7, // number of days in 1 week
];

export function formatDiff(diff: number): string {
  let idx = 0;

  while (diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length) {
    diff /= SEC_ARRAY[idx];
    idx += 1;
  }

  diff = Math.floor(diff);

  if (idx === 0 && diff === 0) {
    diff = 1;
  }

  return diff + " " + localeFunc(idx);
}

function localeFunc(index: number): string {
  return ["minute ago", "hour ago", "day ago"][index];
}
