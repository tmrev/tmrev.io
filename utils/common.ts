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
