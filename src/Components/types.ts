interface HeightState {
        height: number,
}

interface AgeState {
        age: number,
}

interface PercentileState {
        percentile: number,
}
interface SizeState {
        size: number | string | undefined,
}

export interface CalculatorState {
        age: number,
        height: number,
        percentile: number,
        size: string,
}

export interface ProfileState {
        name: string,
        birthday: number,
        height: number,
        percentile: number,
}