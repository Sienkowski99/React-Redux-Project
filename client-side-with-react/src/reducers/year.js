import axios from "axios";

const yearReducer = (state = {}, action) => {
    console.log(action.type)
    switch(action.type) {
        case "SET_YEAR":
            console.log("CHANGING YEAR")
            return {...payload.yearAndMonth}
        case "SWAP":
            console.log(action.payload)
            // return {...action.payload.year.data}
            const obj = {
                name: action.payload.year.data.year,
                months: action.payload.year.data.months,
                month_to_display: action.payload.year.data.months.filter(month => month.name === action.payload.month_to_display)[0]
            }
            console.log(obj)
            return {...obj}
        case "NEXT_YEAR":
            console.log("NEXT")
            axios.post()
            return state
        case "PREV_YEAR":
            console.log("PREV")
            axios.post("http://localhost:8080/get_year", {year: state.name-1})
            .then(result => {
                console.log(result)
                const obj = {
                    name: result.data.year,
                    months: result.data.months,
                    month_to_display: result.data.months.filter(month => month.name === "December")[0]
                }
                return {...obj}
                // props.swapYear(result, months[today.getMonth()])
            })
            .then(obj => obj)
            .catch(err=>console.log(err))
            // return state
        case 'null':
            return state
        default:
            return state
    }
};


export default yearReducer; 
