import * as XLSX from 'xlsx';

export type EntityKeys<T> = {
  [K in keyof T]: K;
}[keyof T];

const readXLSXFile = <DataType>(
  filePath: string,
  entityConstructor: () => DataType,
) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows: Array<Array<never>> = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
  });

  const headers = rows.shift() as string[];

  const data = rows.map((row) => {
    const entity = entityConstructor();
    for (let index = 0; index < row.length; index++) {
      const header = headers[index] as EntityKeys<DataType>;
      entity[header] = row[index];
    }
    return entity;
  });
  return data;
};

export default readXLSXFile;
