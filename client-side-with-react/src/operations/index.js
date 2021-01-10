import axios from 'axios'
import {setYearAndMonth, setMonth, logIN, logOUT, filterByAUTHOR, sortByDISLIKES, sortByLIKES} from '../actions'

const getYearAndMonth = (year, req_month) => async dispatch => {
    console.log(year + req_month)
    const year_obj = await axios.post("http://localhost:8080/get_year", {year: year})
    .then(result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const obj = {
                name: result.data.content.year,
                months: result.data.content.months,
                month_to_display: result.data.content.months.filter(month => month.name === req_month)[0],
                month_to_display_and_apply_filters: result.data.content.months.filter(month => month.name === req_month)[0]
            }
            return obj
        } else {
            return null
        }
        
    })
    if (year_obj !== null) {
        dispatch(setYearAndMonth(year_obj))
    } else {
        alert("YEAR NOT IN DB")
    }
}

const changeMonth = (year, req_month) => async dispatch => {
    dispatch(setMonth(req_month))
}

const login = (login) => async dispatch => {
    dispatch(logIN(login))
}

const logout = () => async dispatch => {
    dispatch(logOUT())
}

const filterByAuthor = (author) => async dispatch => {
    dispatch(filterByAUTHOR(author))
}

const sortByLikes = (type) => async dispatch => {
    dispatch(sortByLIKES(type))
}

const sortByDislikes = (type) => async (dispatch, state) => {
    console.log(state())
    dispatch(sortByDISLIKES(type))
}

const operations = {
    getYearAndMonth,
    changeMonth,
    login,
    logout,
    filterByAuthor,
    sortByLikes,
    sortByDislikes
}
  
export default operations