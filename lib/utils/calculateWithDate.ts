type DataEntry = Record<any, any>;

export function calculateWeekDifference(data: DataEntry[]) {
  // const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let lastWeekSum = 0,
    previousWeekSum = 0,
    difference = 0;
  if (data.length < 8)
    return {
      lastWeekSum: 0,
      previousWeekSum: 0,
      difference: 0,
    };

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

export function showDateChart(initDate: string) {
  const [, month, date] = initDate.split('-');
  return `${month}/${date}`;
}
