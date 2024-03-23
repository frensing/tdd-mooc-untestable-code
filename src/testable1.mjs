const millisPerDay = 24 * 60 * 60 * 1000;

// Now, the code accepts a given Date object or creates the current date.
// During testing we can provide a date.

export function daysUntilChristmas(now=new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(today.getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
