import axios from 'axios'
import {setYearAndMonth, setMonth} from '../actions'

const getYearAndMonth = (year, req_month) => async dispatch => {
    console.log(year + req_month)
    const year_obj = await axios.post("http://localhost:8080/get_year", {year: year})
    .then(result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const obj = {
                name: result.data.content.year,
                months: result.data.content.months,
                month_to_display: result.data.content.months.filter(month => month.name === req_month)[0]
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
    // const year_obj = await axios.post("http://localhost:8080/get_year", {year: year})
    // .then(result => {
    //     console.log(result)
    //     if (result.statusCode >= 200 && result.statusCode < 300) {
            
    //         return obj
    //     } else {
    //         alert("YEAR NOT IN DB")
    //     }
        
    // })
    // const obj = {
    //     month_to_display: result.data.months.filter(month => month.name === req_month)[0]
    // }
    dispatch(setMonth(req_month))
}

const operations = {
    getYearAndMonth,
    changeMonth
}
  
export default operations