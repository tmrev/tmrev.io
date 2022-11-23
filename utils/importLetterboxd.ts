import { camelCase, papaParseAsync } from './common';

export interface LetterboxdImport {
  name: string
  year: string
  letterboxdUri: string
  date: string
  rating?: string
  review?: string
  tags?: string
  watchedDate?: string
}

const importLetterboxd = async (file: File): Promise<LetterboxdImport[]> => {
  try {
    const data = await papaParseAsync(file) as any[][];
    const cleanData: any[] = [];

    if (data.length > 1) {
      // set headers
      const headers = data[0];

      // remove the headers
      const newData = data.slice(1);

      // maps through data then reduce header to assign values
      const formattedData = newData.map((_, i) => headers.reduce((prev, curr, index) => ({
        ...prev,
        [camelCase(curr)]: newData[i][index],
      }), ''));

      // removes any undefined values
      formattedData.forEach((v) => {
        if (v.name && v.year) {
          cleanData.push(v);
        }
      });
    }

    return cleanData;
  } catch (error) {
    return [];
  }
};

export default importLetterboxd;
