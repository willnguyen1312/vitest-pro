function changeTimezone(date: Date, timeZone: string) {
  // suppose the date is 12:00 UTC
  const shiftedDate = new Date(
    date.toLocaleString("en-US", {
      timeZone,
    }),
  );

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(shiftedDate.getTime());
}

// E.g.
var here = new Date();
var there = changeTimezone(here, "America/Toronto");

console.log(`Here: ${here.toString()}\nToronto: ${there.toString()}`);
