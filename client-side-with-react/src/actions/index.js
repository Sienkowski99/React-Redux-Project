export const SET_YEAR = "SET_YEAR"
export const SET_MONTH = "SET_MONTH"
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

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
