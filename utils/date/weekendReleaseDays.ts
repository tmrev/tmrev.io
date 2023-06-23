import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday);

function getThursdayAndNextSunday() {
  const today = dayjs();
  const thursday = today.weekday(4); // 4 is for Thursday
  const nextSunday = today.weekday(7); // 11 is for next Sunday

  return {
    sunday: nextSunday.format('YYYY-MM-DD'),
    thursday: thursday.format('YYYY-MM-DD')
  };
}

export default getThursdayAndNextSunday