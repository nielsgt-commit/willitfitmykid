





export interface ProfileState {
    name: string;
    birthday: number;
    heightNow: number;
    calculatedPercentile: number;
}

export interface State {
    months: number,
    height: number | undefined,
    percentile: number,
    size: `${number}`,
}