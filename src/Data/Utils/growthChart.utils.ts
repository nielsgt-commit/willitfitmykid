// Lookup height based on age in months and percentile
export function lookUpHeight( ageMonths: number, percentile: number):number{
    return (ageMonths / 2 + 14);
}

//
export function lookUpAge(height: number, percentile: number): number{
    return (height - 14) * 2 / 4;
}

export function lookUpPercentile(height: number, ageMonths: number): number{
    return (height - ageMonths ) * 2
}

export function lookUpSize(height: number): number{
    return (height - 14) * 2;
}