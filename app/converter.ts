import fs from 'fs';
import csv from 'csv-parser';

function findLatLongByZipCode(zipCode: string): Promise<number[] | null> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream('zip_lat_long.csv').pipe(csv());

    stream.on('data', function (row: Record<string, string>) {
      if (row.ZIP === zipCode) {
        resolve([parseFloat(row.LAT), parseFloat(row.LNG)]);
        stream.destroy(); // Stop reading the CSV once we find the match
      }
    });

    stream.on('end', () => {
      resolve(null); // If we reach the end, resolve with null (not found)
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}