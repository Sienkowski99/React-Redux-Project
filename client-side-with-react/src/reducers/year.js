import axios from "axios";

const yearReducer = (state = {}, action) => {
    console.log(action.type)
    switch(action.type) {
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
            return state
        case 'null':
            return state
        default:
            return state
    }
};


export default yearReducer; 
