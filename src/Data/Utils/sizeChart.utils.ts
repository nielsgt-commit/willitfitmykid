import type {
  KidsClothingCategoryTable,
  KidsClothingSizeRow,
  Region,
  KidsClothingSizeKey,
} from "../SizeCharts/kids_clothing_sizes";

// Find size by region conversion
export const findByRegion = (
  table: KidsClothingCategoryTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined =>
  Object.values(table).find((row) => row.conversions[region] === label);

// Find size by ageLabel
export const findByAgeLabel = (
  table: KidsClothingCategoryTable,
  ageLabel: string,
): KidsClothingSizeRow | undefined =>
  Object.values(table).find((row) => row.ageLabel === ageLabel);

// Find size by key
export const findByKey = (
  table: KidsClothingCategoryTable,
  key: KidsClothingSizeKey,
): KidsClothingSizeRow | undefined => table[key];

// Find size by height in cm
export const findByHeight = (
  table: KidsClothingCategoryTable,
  heightCm: number,
): KidsClothingSizeRow | undefined =>
  Object.values(table).find(
    (row) => heightCm >= row.heightCm.min && heightCm <= row.heightCm.max,
  );

// Find all sizes in height range
export const findByHeightRange = (
  table: KidsClothingCategoryTable,
  minCm: number,
  maxCm: number,
): KidsClothingSizeRow[] =>
  Object.values(table).filter(
    (row) => row.heightCm.min <= maxCm && row.heightCm.max >= minCm,
  );
