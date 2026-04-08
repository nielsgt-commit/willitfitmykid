import type {
    KidsClothingSizeRow,
    Region,
    KidsClothingSizeKey, KidsClothingTable,
} from "../SizeCharts/kids_clothing_sizes";

// Find size by region conversion
export const findByRegion = (
  table: KidsClothingTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined =>
  Object.values(table).find((row) => row.conversions[region] === label);

// Find size by ageLabel
export const findByAgeLabel = (
  table: KidsClothingTable,
  ageLabel: string,
): KidsClothingSizeRow | undefined =>
  Object.values(table).find((row) => row.ageLabel === ageLabel);

// Find size by key
export const findByKey = (
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
): KidsClothingSizeRow | undefined => table[key];

// Find size by height in cm
export const findByHeight = (
  table: KidsClothingTable,
  heightCm: number,
): KidsClothingSizeRow | undefined  =>
  Object.values(table).find(
    (row) => heightCm >= row.heightCm.min && heightCm <= row.heightCm.max,
  );


export const findHeightBySize = (
  table: KidsClothingTable,
  size: KidsClothingSizeKey,
): number | undefined => table[size]?.heightCm.min;

// Find all sizes in height range
export const findByHeightRange = (
  table: KidsClothingTable,
  minCm: number,
  maxCm: number,
): KidsClothingSizeRow[] =>
  Object.values(table).filter(
    (row) => row.heightCm.min <= maxCm && row.heightCm.max >= minCm,
  );
