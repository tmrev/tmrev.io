import dayjs from 'dayjs';

export default function formatDate(date: Date):string {
  if (!date) return '-';

  return dayjs(date).format('YYYY');
}
