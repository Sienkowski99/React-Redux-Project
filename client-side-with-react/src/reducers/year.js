const yearReducer = (state = {activeFilters: {filters: {}, sorters: {}}}, action) => {
    console.log(action.type)
    switch(action.type) {
        case "SET_YEAR":
            console.log("CHANGING YEAR")
            console.log(action.payload)
            return {...state, ...action.payload}
        case "SET_MONTH":
            console.log("CHANGING MONTH")
            console.log(action.payload)
            const req_month = state.months.filter(month => month.name === action.payload)[0]
            const req_month_with_filters = req_month
            const req_month_sorted = req_month_with_filters
            return {
                ...state,
                month_to_display: req_month,
                month_to_display_and_apply_filters: req_month_sorted
            }
        case "FILTER_BY_AUTHOR":
            // console.log(action.payload)
            const new_state = {...state}
            new_state.activeFilters.filters = {...new_state.activeFilters.filters, author: action.payload}
            console.log(new_state.activeFilters.filters.author)
            new_state.month_to_display_and_apply_filters = {name: new_state.month_to_display.name, days: new_state.month_to_display.days.map(day => {return {day: day.day, availablePeople: day.availablePeople.filter(post => new_state.activeFilters.filters.author ? post.author.includes(new_state.activeFilters.filters.author) : true)}})}
            // new_state.month_to_display_and_apply_filters = {name: new_state.month_to_display.name, days: 
            // console.log(new_state.month_to_display_and_apply_filters.days[0].availablePeople.filter(post => post.author === new_state.activeFilters.filters.author))
            console.log(new_state)
            return new_state
        case "SORT_BY_LIKES":
            return state
        case "SORT_BY_LIKES":
            return state
        default:
            return state
    }
};


export default yearReducer; 
