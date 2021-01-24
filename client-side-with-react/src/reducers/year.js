const initial_state = {
    activeFilters: {
        filters: {
            author: "",
            content: ""
        },
        sorters: {
            likes: null,
            dislikes: null,
            type: null
        }
    }
}

const yearReducer = (state = initial_state, action) => {
    // console.log(action.type)
    switch(action.type) {
        case "UPDATE_YEAR_POSTS":
            return {...state, ...action.payload}
        case "SET_YEAR":
            // console.log("CHANGING YEAR")
            // console.log(action.payload)
            return {...state, ...action.payload}
        case "SET_MONTH":
            // console.log("CHANGING MONTH")
            // console.log(action.payload)
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
            // new_state.activeFilters.filters = {...new_state.activeFilters.filters, author: action.payload}
            new_state.activeFilters.filters.author = action.payload
            // console.log(new_state.activeFilters.filters.author)
            
            new_state.month_to_display_and_apply_filters = {
                name: new_state.month_to_display.name,
                // days: new_state.month_to_display.days.map(day => filter_and_sorter(day, new_state.activeFilters))
                days: new_state.month_to_display.days.map(day => {return {day: day.day, availablePeople: day.availablePeople
                    .filter(post => new_state.activeFilters.filters.author ? post.author.includes(new_state.activeFilters.filters.author) : true)}})
                    // .sort((postA, postB) => new_state.activeFilters.sorters.byL postA.)}})
            }
            // new_state.month_to_display_and_apply_filters = {name: new_state.month_to_display.name, days: 
            // console.log(new_state.month_to_display_and_apply_filters.days[0].availablePeople.filter(post => post.author === new_state.activeFilters.filters.author))
            console.log(new_state)
            return new_state
        case "SORT_BY_LIKES":
            // new_state = {...state}
            // if (action.payload !== "none") {
            //     new_state.activeFilters.sorters.likes = action.payload
            // } else {
            //     new_state.activeFilters.sorters.likes = null
            // }
            // new_state.month_to_display_and_apply_filters.days = new_state.month_to_display.days.map(day => filter_and_sorter(day, new_state.activeFilters))
            // console.log(new_state)
            // return new_state
            return {...action.payload}
        case "SORT_BY_DISLIKES":
            // console.log("YEAR PAYLOAD")
            // console.log(action.payload)
            return {...action.payload}
        default:
            return state
    }
};


export default yearReducer; 
