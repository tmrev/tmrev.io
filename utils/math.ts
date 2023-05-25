/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loops/no-loops */

export const getMedian = (arr: number[]): number | undefined => {
  if (!arr.length) return undefined;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? ((s[mid - 1] + s[mid]) / 2) : s[mid];
};

export function getAverage(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;

  return average;
}

export function getStandardDeviation(numbersArr: number[]): number {
  // CALCULATE AVERAGE
  let total = 0;
  for (const key in numbersArr) { total += numbersArr[key]; }
  const meanVal = total / numbersArr.length;
  // CALCULATE AVERAGE

  // CALCULATE STANDARD DEVIATION
  let SDprep = 0;
  for (const key in numbersArr) { SDprep += (parseFloat(String(numbersArr[key])) - meanVal) ** 2; }
  const SDresult = Math.sqrt(SDprep / (numbersArr.length - 1));
  // CALCULATE STANDARD DEVIATION

  const visualScale = SDresult * 2

  return visualScale > 10 ? 10 : visualScale
}
