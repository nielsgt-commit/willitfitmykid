export const regions = ["EU", "US", "UK"] as const;
export type Region = typeof regions[number];

export type CmRange = {
  min: number;
  max: number;
};

/**
 * Canonical kids clothing size key.
 * In this model, the key is usually the EU height size, e.g. "92", "98", "104".
 */
export type KidsClothingSizeKey = `${number}`;

export type KidsClothingSizeRow = {
  key: KidsClothingSizeKey;
  ageLabel?: string;
  heightCm: CmRange;
  conversions: Partial<Record<Region, string>>;
};

export type KidsClothingTable = Record<
  KidsClothingSizeKey,
  KidsClothingSizeRow
>;

const kidsClothingSizeRows: KidsClothingTable = {
  "56": {
    key: "56",
    ageLabel: "0-1M",
    heightCm: { min: 53, max: 56 },
    conversions: { EU: "56", US: "NB", UK: "0-1M" },
  },
  "62": {
    key: "62",
    ageLabel: "1-3M",
    heightCm: { min: 57, max: 62 },
    conversions: { EU: "62", US: "0-3M", UK: "1-3M" },
  },
  "68": {
    key: "68",
    ageLabel: "3-6M",
    heightCm: { min: 63, max: 68 },
    conversions: { EU: "68", US: "3-6M", UK: "3-6M" },
  },
  "74": {
    key: "74",
    ageLabel: "6-9M",
    heightCm: { min: 69, max: 74 },
    conversions: { EU: "74", US: "6-9M", UK: "6-9M" },
  },
  "80": {
    key: "80",
    ageLabel: "9-12M",
    heightCm: { min: 75, max: 80 },
    conversions: { EU: "80", US: "12M", UK: "9-12M" },
  },
  "86": {
    key: "86",
    ageLabel: "12-18M",
    heightCm: { min: 81, max: 86 },
    conversions: { EU: "86", US: "18M", UK: "12-18M" },
  },
  "92": {
    key: "92",
    ageLabel: "18-24M",
    heightCm: { min: 87, max: 92 },
    conversions: { EU: "92", US: "2T", UK: "18-24M" },
  },
  "98": {
    key: "98",
    ageLabel: "2-3Y",
    heightCm: { min: 93, max: 98 },
    conversions: { EU: "98", US: "3T", UK: "2-3Y" },
  },
  "104": {
    key: "104",
    ageLabel: "3-4Y",
    heightCm: { min: 99, max: 104 },
    conversions: { EU: "104", US: "4T", UK: "3-4Y" },
  },
  "110": {
    key: "110",
    ageLabel: "4-5Y",
    heightCm: { min: 105, max: 110 },
    conversions: { EU: "110", US: "5", UK: "4-5Y" },
  },
  "116": {
    key: "116",
    ageLabel: "5-6Y",
    heightCm: { min: 111, max: 116 },
    conversions: { EU: "116", US: "6", UK: "5-6Y" },
  },
  "122": {
    key: "122",
    ageLabel: "6-7Y",
    heightCm: { min: 117, max: 122 },
    conversions: { EU: "122", US: "6X", UK: "6-7Y" },
  },
  "128": {
    key: "128",
    ageLabel: "7-8Y",
    heightCm: { min: 123, max: 128 },
    conversions: { EU: "128", US: "7-8", UK: "7-8Y" },
  },
  "134": {
    key: "134",
    ageLabel: "8-9Y",
    heightCm: { min: 129, max: 134 },
    conversions: { EU: "134", US: "8-9", UK: "8-9Y" },
  },
  "140": {
    key: "140",
    ageLabel: "9-10Y",
    heightCm: { min: 135, max: 140 },
    conversions: { EU: "140", US: "10", UK: "9-10Y" },
  },
  "146": {
    key: "146",
    ageLabel: "10-11Y",
    heightCm: { min: 141, max: 146 },
    conversions: { EU: "146", US: "10-12", UK: "10-11Y" },
  },
  "152": {
    key: "152",
    ageLabel: "11-12Y",
    heightCm: { min: 147, max: 152 },
    conversions: { EU: "152", US: "12", UK: "11-12Y" },
  },
  "158": {
    key: "158",
    ageLabel: "12-13Y",
    heightCm: { min: 153, max: 158 },
    conversions: { EU: "158", US: "12-14", UK: "12-13Y" },
  },
  "164": {
    key: "164",
    ageLabel: "13-14Y",
    heightCm: { min: 159, max: 164 },
    conversions: { EU: "164", US: "14", UK: "13-14Y" },
  },
};

export const kidsClothingTable: KidsClothingTable = kidsClothingSizeRows;

export function getSizeRow(
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
): KidsClothingSizeRow | undefined {
  return table[key];
}

export function convertCanonicalSize(
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
  targetRegion: Region,
): string | undefined {
  return table[key]?.conversions[targetRegion];
}

export function findCanonicalSize(
  table: KidsClothingTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined {
  return Object.values(table).find(
    (row) => row.conversions[region] === label,
  );
}

export function convertRegionalSize(
  table: KidsClothingTable,
  fromRegion: Region,
  fromLabel: string,
  toRegion: Region,
): string | undefined {
  const row = findCanonicalSize(table, fromRegion, fromLabel);
  return row?.conversions[toRegion];
}

export function findByHeight(
  table: KidsClothingTable,
  heightCm: number,
): KidsClothingSizeRow | undefined {
  return Object.values(table).find(
    (row) => heightCm >= row.heightCm.min && heightCm <= row.heightCm.max,
  );
}

export function listAvailableSizes(
  table: KidsClothingTable,
): KidsClothingSizeRow[] {
  return Object.values(table).sort(
    (a, b) => Number(a.key) - Number(b.key),
  );
}

// Example usage:
// const usSize = convertCanonicalSize(kidsClothingTable, "tops", "104", "US");
// const euSize = convertRegionalSize(kidsClothingTable, "tops", "US", "4T", "EU");
// const bestFit = findByHeight(kidsClothingTable, "tops", 101);
