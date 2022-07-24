export function numberShortHand(number: number): string {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(number);
}

export function formatRuntime(runtime: number): string {
  const hours = runtime / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours}h ${rminutes}m`;
}

export function extractNameFromEmail(email: string | null):string {
  if (!email) return '';

  return email.split('@')[0];
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function roundWithMaxPrecision(n:number, precision = 1) {
  const precisionWithPow10 = 10 ** precision;
  return Math.round(n * precisionWithPow10) / precisionWithPow10;
}
