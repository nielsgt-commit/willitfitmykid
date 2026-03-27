//  Keep track of....
export interface CalculatorState {

        // Measurements
        height: number,
        age: number,
        percentile: number,

        // Sizes
         size: number | string | undefined,

        // Navigation
        step: number,

        // Date time
        date: Date,
}

export interface ProfileState {
        name: string,
        birthday: number,
        height: number,
        percentile: number,
}