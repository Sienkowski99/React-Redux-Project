const displayedDaysReducer = (state = [], action) => {
    console.log(action.type)
    switch(action.type) {
        case 'null':
            return state
        default:
            return state
    }
};

export default displayedDaysReducer; 
