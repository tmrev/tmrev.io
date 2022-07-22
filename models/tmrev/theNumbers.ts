interface TheNumbers {
  title: Title;
  data: TheNumberData[];
}

interface TheNumberData {
  week?: string;
  totalGross: string;
  perTheater: string;
  theaters: string;
  '%Change'?: string;
  gross: string;
  rank: string;
  date: string;
  days?: string;
  '%LW'?: string;
  '%YD'?: string;
}

type Title = 'Weekend Box Office Performance' |
'Daily Box Office Performance' | 'Weekly Box Office Performance'

export type { TheNumberData, TheNumbers, Title };
