import axios from 'axios'
import {setYearAndMonth, setMonth, logIN, logOUT, filterByAUTHOR, sortByDISLIKES, sortByLIKES} from '../actions'

const filter_and_sorter = (day_to_modify, activeFilters) => {
    // FILTERS
    const day = {...day_to_modify}
    if (activeFilters.filters.author) {
        day.availablePeople.filter(post => post.author.includes(activeFilters.filters.author) ? true : false)
    }
    //SORTERS
    if (activeFilters.sorters.likes !== null) {
        if (activeFilters.sorters.likes === "likes_inc") {
            console.log(day.availablePeople)
            day.availablePeople.sort((postA, postB) => postA.likes - postB.likes)
            console.log(day.availablePeople)
        }
        if (activeFilters.sorters.likes === "likes_dic") {
            console.log(day.availablePeople)
            day.availablePeople.sort((postA, postB) => postB.likes - postA.likes)
            console.log(day.availablePeople)
        }
    }
    if (activeFilters.sorters.dislikes !== null) {

        if (activeFilters.sorters.dislikes === "dislikes_inc") {
            console.log(day.availablePeople)
            day.availablePeople.sort((postA, postB) => postB.likes - postA.likes)
            console.log(day.availablePeople)
        }
        if (activeFilters.sorters.dislikes === "dislikes_dic") {
            console.log(day.availablePeople)
            day.availablePeople.sort((postA, postB) => postA.likes - postB.likes)
            console.log(day.availablePeople)
        }
    }
    return day
}

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

const sortByLikes = (type) => async (dispatch, state) => {
    const year_state = state().year
    if (type !== "none") {
        year_state.activeFilters.sorters.likes = type
    } else {
        year_state.activeFilters.sorters.likes = null
    }
    year_state.month_to_display_and_apply_filters.days = year_state.month_to_display.days.map(day => filter_and_sorter(day, year_state.activeFilters))
    // console.log(year_state)
    dispatch(sortByLIKES(year_state))
}

const sortByDislikes = (type) => async (dispatch, state) => {
    const year_state = state().year
    if (type !== "none") {
        year_state.activeFilters.sorters.dislikes = type
    } else {
        year_state.activeFilters.sorters.dislikes = null
    }
    year_state.month_to_display_and_apply_filters.days = year_state.month_to_display.days.map(day => filter_and_sorter(day, year_state.activeFilters))
    // console.log(year_state)
    dispatch(sortByDISLIKES(year_state))
}

const likePost = (id) => async (dispatch) => {
    axios.post("http://localhost:8080/like_post", {
        // year: props.year.name,
        // month: props.year.month_to_display.name,
        // day: props.day,
        id: id
    })
    .then(result => {
        console.log("updated posts: "+result)
        // if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
        //     setYear(props.year.name, props.year.month_to_display.name)
        // } else {
        //     console.log("error")
        // }
    })
    .catch(err=>console.log(err))
}
const operations = {
    getYearAndMonth,
    changeMonth,
    login,
    logout,
    filterByAuthor,
    sortByLikes,
    sortByDislikes,
    likePost
}
  
export default operations