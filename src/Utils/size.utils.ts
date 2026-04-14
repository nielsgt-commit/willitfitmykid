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

export const findCanonicalSize = (
  table: KidsClothingTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined =>
  findRow(table, (row) => row.conversions[region] === label);

export const listAvailableSizes = (
  table: KidsClothingTable,
): KidsClothingSizeRow[] => getRows(table).sort((a, b) => Number(a.key) - Number(b.key));
