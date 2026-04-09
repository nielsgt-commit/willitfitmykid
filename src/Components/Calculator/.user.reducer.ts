case SET_AGE:
    return {
        ...state,
        months: action.payload,
    }
case SET_HEIGHT:

    return {
        ...state,
        height: action.payload,
    }
case SET_PERCENTILE:
    return {
        ...state,
        percentile: action.payload,
    }



























// Increment and decrement Height
            case INCREMENT_HEIGHT: {
                const heightPlus = state.height + 1;
                return {
                    ...state,
                    height: heightPlus,
                }
            }
            case DECREMENT_HEIGHT: {
                const heightMinus = state.height - 1;
                return {
                    ...state,
                    height: heightMinus,
                }
            }

        // Increment and decrement Age
        case INCREMENT_AGE: {
            const monthsPlus = state.months + 1;
            return {
                ...state,
                months: monthsPlus,
            }}
        case DECREMENT_AGE: {
            const monthsMinus = state.months - 1;
            return {
                ...state,
                months: monthsMinus,
            }}



        // Increment and decrement Percentile
        case INCREMENT_PERCENTILE: {
            const numericPercentiles = PERCENTILE.map(p => parseInt(p.slice(1)));
            const currentIndex = numericPercentiles.indexOf(state.percentile);
            const nextIndex = Math.min(currentIndex + 1, numericPercentiles.length - 1);
            const percentilePlus = numericPercentiles[currentIndex === -1 ? 0 : nextIndex];
            return {
                ...state,
                percentile: percentilePlus,
            }}
        case DECREMENT_PERCENTILE: {
            const numericPercentiles = PERCENTILE.map(p => parseInt(p.slice(1)));
            const currentIndex = numericPercentiles.indexOf(state.percentile);
            const prevIndex = currentIndex === -1 ? 0 : Math.max(currentIndex - 1, 0);
            const percentileMinus = numericPercentiles[prevIndex];
            return {
                ...state,
                percentile: percentileMinus,
            }}

