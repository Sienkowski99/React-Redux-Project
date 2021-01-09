const yearReducer = (state = {activeFilters: []}, action) => {
    console.log(action.type)
    switch(action.type) {
        case "SET_YEAR":
            console.log("CHANGING YEAR")
            console.log(action.payload)
            return {...state, ...action.payload}
        case "SET_MONTH":
            console.log("CHANGING MONTH")
            console.log(action.payload)
            return {...state, month_to_display: state.months.filter(month => month.name === action.payload)[0]}
        case "FILTER_BY_AUTHOR":
            console.log(action.payload)
            const new_state = {...state}
            console.log(new_state)
            return state
        default:
            return state
    }
};


export default yearReducer; 
