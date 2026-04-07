export function lookupHeightByAgeMonths( ageMonths: number, percentile: number):number{
    return (ageMonths / 2 + 14);
}


export function lookupPercentileByHeightAgeMonths(height: number, ageMonths: number): number{
    return (height - ageMonths / 2 - 14) * 2
}