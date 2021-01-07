import axios from 'axios'
import {setYearAndMonth} from '../actions'

const getYearAndMonth = (year, req_month) => async dispatch => {
    const year_obj = await axios.post("http://localhost:8080/get_year", {year: year})
    .then(result => {
        console.log(result)
        const obj = {
            name: result.data.year,
            months: result.data.months,
            month_to_display: result.data.months.filter(month => month.name === req_month)[0]
        }
        return obj
    })
    dispatch(setYearAndMonth(year_obj))
}

const operations = {
    getYearAndMonth    
}
  
export default operations