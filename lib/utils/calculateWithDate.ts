type DataEntry = Record<any, any>;

export function calculateWeekDifference(data: DataEntry[]) {
  const dataDescent = [...data].reverse();

  if (dataDescent.length === 0) return 0;

  const todayMau = dataDescent[0].mau;

  if (dataDescent[6]) {
    return todayMau - dataDescent[6].mau;
  }

  for (let i = 1; i < dataDescent.length && i <= 6; i++) {
    if (dataDescent[i]) {
      return todayMau - dataDescent[i].mau;
    }
  }

  return 0;
}

export function showDateChart(initDate: string) {
  const [, month, date] = initDate.split('-');
  return `${month}/${date}`;
}
