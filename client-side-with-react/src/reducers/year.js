const initial_state = {
    activeFilters: {
        filters: {
            author: ""
        },
        sorters: {
            likes: null,
            dislikes: null
        }
    }
}

let new_state = {}

const yearReducer = (state = initial_state, action) => {
    const filter_and_sorter = (day_to_modify, activeFilters) => {
        console.log("RECIEVED DAY "+JSON.stringify(day_to_modify.availablePeople))
        const day = {...day_to_modify}
        if (activeFilters.filters.author) {
            day.availablePeople.filter(post => post.author.includes(activeFilters.filters.author) ? true : false)
        }
        //SORTERS
        if (activeFilters.sorters.likes !== null) {
            if (activeFilters.sorters.likes === "inc") {
                day.availablePeople.sort((postA, postB) => postB.likes - postA.likes)
            }
            if (activeFilters.sorters.likes === "dic") {
                day.availablePeople.sort((postA, postB) => postA.likes - postB.likes)
            }
            // activeFilters.sorters.likes === "inc" ? day.availablePeople.sort((postA, postB) => postA.likes - postB.likes) : null
            // activeFilters.sorters.likes === "dic" ? day.availablePeople.sort((postA, postB) => postB.likes - postA.likes) : null
        }
        if (activeFilters.sorters.dislikes !== null) {
            if (activeFilters.sorters.likes === "inc") {
                day.availablePeople.sort((postA, postB) => postB.likes - postA.likes)
            }
            if (activeFilters.sorters.likes === "dic") {
                day.availablePeople.sort((postA, postB) => postA.likes - postB.likes)
            }
        }
        return day
    }
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
            new_state = {...state}
            if (action.payload !== "none") {
                new_state.activeFilters.sorters.likes = action.payload
            } else {
                new_state.activeFilters.sorters.likes = null
            }
            new_state.month_to_display_and_apply_filters.days = new_state.month_to_display.days.map(day => filter_and_sorter(day, new_state.activeFilters))
            console.log(new_state)
            return new_state
        case "SORT_BY_LIKES":
            new_state = {...state}
            if (action.payload !== "none") {
                new_state.activeFilters.sorters.dislikes = action.payload
            } else {
                new_state.activeFilters.sorters.dislikes = null
            }
            new_state.month_to_display_and_apply_filters.days = new_state.month_to_display.days.map(day => filter_and_sorter(day, new_state.activeFilters))
            console.log(new_state)
            return new_state
        default:
            return state
    }
};


export default yearReducer; 
