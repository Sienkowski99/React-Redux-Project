export const SET_YEAR = "SET_YEAR"
export const SET_MONTH = "SET_MONTH"
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const FILTER_BY_AUTHOR = "FILTER_BY_AUTHOR"
export const SORT_BY_LIKES = "SORT_BY_LIKES"
export const SORT_BY_DISLIKES = "SORT_BY_DISLIKES"

export const setYearAndMonth = (yearAndMonth) => ({
    type: SET_YEAR,
    payload: yearAndMonth
})

export const setMonth = (month) => ({
    type: SET_MONTH,
    payload: month
})

export const logIN = (login) => ({
    type: LOG_IN,
    payload: login
})

export const logOUT = () => ({
    type: LOG_OUT,
})

export const filterByAUTHOR = (author) => ({
    type: FILTER_BY_AUTHOR,
    payload: author
})

export const sortByLIKES = (type) => ({
    type: SORT_BY_LIKES,
    payload: type
})

export const sortByDISLIKES = (type) => ({
    type: SORT_BY_DISLIKES,
    payload: type
})