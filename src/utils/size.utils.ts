
import type {KidsClothingSizeKey, KidsClothingSizeRow, KidsClothingTable, Region, UserRecord} from "@myTypes/types.ts";
import {getEffectiveHeight} from "@utils/growth.utils.ts";

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

export const findSizeForHeight = (
  table: KidsClothingTable,
  heightCm: number,
): KidsClothingSizeRow => {
  const sorted = listAvailableSizes(table);
  const exact = sorted.find((row) => heightCm >= row.heightCm.min && heightCm <= row.heightCm.max);
  if (exact) return exact;
  // Find nearest by distance to midpoint
  return sorted.reduce((best, row) => {
    const mid = (row.heightCm.min + row.heightCm.max) / 2;
    const bestMid = (best.heightCm.min + best.heightCm.max) / 2;
    return Math.abs(heightCm - mid) < Math.abs(heightCm - bestMid) ? row : best;
  });
};

/**
 * The size row that fits the youngest kid (the one most likely to need the
 * smallest size), used to initialise the calculator. Returns undefined when
 * there are no kids so callers can fall back to a default.
 */
export const selectSizeForYoungest = (
  table: KidsClothingTable,
  kids: UserRecord[],
): KidsClothingSizeRow | undefined => {
  if (kids.length === 0) return undefined;
  const youngest = kids.reduce((a, b) => (a.birthday.toString() > b.birthday.toString() ? a : b));
  return findSizeForHeight(table, getEffectiveHeight(youngest));
};
