import papa from 'papaparse';

import { camelCase } from './common';

export interface IMDBImport {
  position: string;
  const: string;
  created: string;
  modified: string;
  description: string;
  title: string;
  url: string;
  titleType: string;
  imdbRating: string;
  runtimeMins: string;
  year: string;
  genres: string;
  numVotes: string;
  releaseDate: string;
  directors: string;
  yourRating: string;
  dateRated: string;
}

export const papaParseAsync = async (rawFile: File) => new Promise((resolve, reject) => {
  papa.parse(rawFile, {
    complete: (results) => {
      resolve(results.data);
    },
    error: (err) => {
      reject(err);
    },
  });
});

const importIMDB = async (file: File): Promise<IMDBImport[]> => {
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
        if (v.const) {
          cleanData.push(v);
        }
      });
    }

    return cleanData;
  } catch (error) {
    return [];
  }
};

export default importIMDB;
