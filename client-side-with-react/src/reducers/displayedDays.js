const displayedDaysReducer = (state = {name: "January", days: []}, action, props) => {
    // console.log(action.type)
    switch(action.type) {
        case "NEXT_MONTH":
            props.siema()
            return state
        case 'null':
            return state
        default:
            return state
    }
};


export default displayedDaysReducer; 
