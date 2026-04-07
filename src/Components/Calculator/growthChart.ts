// Pure growth chart lookup functions — no React dependencies.
// TODO: Replace stub implementations with actual WHO/CDC growth chart data.

export function lookupHeightForAgeAndPercentile(ageMonths: number, percentile: number): number {
    // Stub: linear approximation for development
    const baseHeight = 45 + ageMonths * 0.6;
    const percentileOffset = (percentile - 50) * 0.1;
    return Math.round(baseHeight + percentileOffset);
}

export function lookupPercentileForAgeAndHeight(ageMonths: number, heightCm: number): number {
    // Stub: inverse of the above approximation
    const baseHeight = 45 + ageMonths * 0.6;
    const percentile = Math.round(50 + (heightCm - baseHeight) / 0.1);
    return Math.max(1, Math.min(99, percentile));
}

export function lookupSizeForHeight(heightCm: number): number {
    // Stub: common EU children's clothing size brackets
    if (heightCm <= 50) return 50;
    if (heightCm <= 56) return 56;
    if (heightCm <= 62) return 62;
    if (heightCm <= 68) return 68;
    if (heightCm <= 74) return 74;
    if (heightCm <= 80) return 80;
    if (heightCm <= 86) return 86;
    if (heightCm <= 92) return 92;
    if (heightCm <= 98) return 98;
    if (heightCm <= 104) return 104;
    if (heightCm <= 110) return 110;
    if (heightCm <= 116) return 116;
    if (heightCm <= 122) return 122;
    if (heightCm <= 128) return 128;
    if (heightCm <= 134) return 134;
    if (heightCm <= 140) return 140;
    if (heightCm <= 146) return 146;
    if (heightCm <= 152) return 152;
    if (heightCm <= 158) return 158;
    if (heightCm <= 164) return 164;
    if (heightCm <= 170) return 170;
    return 176;
}