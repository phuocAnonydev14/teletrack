type DataEntry = Record<any, any>;

export function calculateWeekDifference(data: DataEntry[]) {
  const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (sortedData.length < 14)
    return {
      lastWeekSum: 0,
      previousWeekSum: 0,
      difference: 0,
    };

  const lastWeekSum = sortedData.slice(-7).reduce((sum, entry) => sum + entry.amount, 0);
  const previousWeekSum = sortedData.slice(-14, -7).reduce((sum, entry) => sum + entry.amount, 0);
  const difference = lastWeekSum - previousWeekSum;

  return {
    lastWeekSum,
    previousWeekSum,
    difference,
  };
}
