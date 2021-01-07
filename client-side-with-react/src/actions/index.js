export const SET_YEAR = "SET_YEAR"
export const SET_MONTH = "SET_MONTH"

export const setYearAndMonth = (yearAndMonth) => ({
    type: SET_YEAR,
    payload: yearAndMonth
})

export const setMonth = (month) => ({
    type: SET_MONTH,
    payload: month
})