





export interface ProfileState {
    name: string;
    birthday: number;
    heightNow: number;
    calculatedPercentile: number;
}

export interface State {
    months: number,
    height: number | undefined,
    heightRange: number[],
    percentile: number,
    size: `${number}`,
    conversions: Partial<Record<'EU' | 'UK' | 'US', string>>,
}