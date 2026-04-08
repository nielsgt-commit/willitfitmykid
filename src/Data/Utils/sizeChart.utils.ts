import type {
    KidsClothingSizeRow,
    Region,
    KidsClothingSizeKey, KidsClothingTable,
} from "../SizeCharts/kids_clothing_sizes";

const getRows = (table: KidsClothingTable): KidsClothingSizeRow[] =>
  Object.values(table);

const findRow = (
  table: KidsClothingTable,
  predicate: (row: KidsClothingSizeRow) => boolean,
): KidsClothingSizeRow | undefined => getRows(table).find(predicate);

export const getSizeRow = (
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
): KidsClothingSizeRow | undefined => table[key];

export const convertCanonicalSize = (
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
  targetRegion: Region,
): string | undefined => table[key]?.conversions[targetRegion];

export const findCanonicalSize = (
  table: KidsClothingTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined =>
  findRow(table, (row) => row.conversions[region] === label);

export const convertRegionalSize = (
  table: KidsClothingTable,
  fromRegion: Region,
  fromLabel: string,
  toRegion: Region,
): string | undefined => {
  const row = findCanonicalSize(table, fromRegion, fromLabel);
  return row?.conversions[toRegion];
};

export const listAvailableSizes = (
  table: KidsClothingTable,
): KidsClothingSizeRow[] => getRows(table).sort((a, b) => Number(a.key) - Number(b.key));

// Find size by region conversion
export const findByRegion = (
  table: KidsClothingTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined =>
  findRow(table, (row) => row.conversions[region] === label);

// Find size by ageLabel
export const findByAgeLabel = (
  table: KidsClothingTable,
  ageLabel: string,
): KidsClothingSizeRow | undefined =>
  findRow(table, (row) => row.ageLabel === ageLabel);

// Find size by key
export const findByKey = (
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
): KidsClothingSizeRow | undefined => getSizeRow(table, key);

// Find size by height in cm
export const findByHeight = (
  table: KidsClothingTable,
  heightCm: number,
): KidsClothingSizeRow | undefined  =>
  findRow(
    table,
    (row) => heightCm >= row.heightCm.min && heightCm <= row.heightCm.max,
  );


export const findHeightBySize = (
  table: KidsClothingTable,
  size: KidsClothingSizeKey,
): number | undefined => table[size]?.heightCm.min;

export const findHeightRangeBySize = (
  table: KidsClothingTable,
  size : KidsClothingSizeKey,
): number[] => {

  return [table[size].heightCm.min, table[size].heightCm.max];
}


// Find all sizes in height range
export const findByHeightRange = (
  table: KidsClothingTable,
  minCm: number,
  maxCm: number,
): KidsClothingSizeRow[] =>
  getRows(table).filter(
    (row) => row.heightCm.min <= maxCm && row.heightCm.max >= minCm,
  );
