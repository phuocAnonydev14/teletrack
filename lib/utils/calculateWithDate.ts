type DataEntry = Record<any, any>;

export function calculateWeekDifference(data: DataEntry[]) {
  // const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let lastWeekSum = 0,
    previousWeekSum = 0,
    difference = 0;
  if (data.length < 14)
    return {
      lastWeekSum: 0,
      previousWeekSum: 0,
      difference: 0,
    };
  // const lastWeekSum = data.slice(-7).reduce((sum, entry) => {
  //   console.log('sum', sum);
  //   return sum + entry.amount;
  // }, 0);
  // const previousWeekSum = data.slice(-14, -7).reduce((sum, entry) => sum + entry.amount, 0);
  // console.log('lastWeekSum', lastWeekSum, previousWeekSum);

  data.map((entry, index) => {
    if (index <= 6) {
      lastWeekSum += entry.amount;
    } else if (index <= 13) {
      previousWeekSum += entry.amount;
    }
  });

  difference = lastWeekSum - previousWeekSum;

  return {
    lastWeekSum,
    previousWeekSum,
    difference,
  };
}
