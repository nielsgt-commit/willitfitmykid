export const PERCENTILE = ['P3','P10','P25','P50','P75','P90','P97']




export interface ProfileState {
    name: string;
    birthday: number;
    height: number;
    percentile: number;
}

export interface CalculatorState {
    months: number,
    height: number,
    percentile: number,
    size: number | string | undefined,
}