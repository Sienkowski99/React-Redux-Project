import axios from 'axios'
import {setYearAndMonth, setMonth, logIN, logOUT} from '../actions'

// const api_url = "http://10.45.3.171/api"

const api_url = "http://localhost:8080"
const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const getYearAndMonth = (year, req_month) => async dispatch => {
    console.log(year + req_month)
    const year_obj = await axios.post(`${api_url}/get_year`, {year: year})
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

const fi_and_so = (year_state) => {

    let x = {...year_state}
    
    x.month_to_display_and_apply_filters = {
        name: year_state.month_to_display.name,
        days: year_state.month_to_display.days.map(day=> {
            let x = [...day.posts]
            x = x.filter(post => {
                        // let f = post.content.toLowerCase().includes(year_state.activeFilters.filters.content.toLowerCase())
                        // console.log(f)
                        return (post.author.includes(year_state.activeFilters.filters.author)
                        // return f
                         &&
                        post.content.toLowerCase().includes(year_state.activeFilters.filters.content.toLowerCase())
                        )
            })
            if (year_state.activeFilters.sorters.likes) {
                // console.log("SORTUJE PO LAJKACH")
                if (year_state.activeFilters.sorters.typr === "ASC") {
                    // console.log("SORTUJE MALEJACO")
                    x = x.sort((postA, postB) => postB.likes - postA.likes)
                }
                if (year_state.activeFilters.sorters.typr === "DESC") {
                    x = x.sort((postA, postB) => postA.likes - postB.likes)
                }
            }
            if (year_state.activeFilters.sorters.dislikes) {
                if (year_state.activeFilters.sorters.type === "ASC") {
                    x = x.sort((postA, postB) => postB.dislikes - postA.dislikes)
                }
                if (year_state.activeFilters.sorters.type === "DESC") {
                    x = x.sort((postA, postB) => postA.dislikes - postB.dislikes)
                }
            }
            return {...day, posts: [...x]}
            
        })
    }
    // console.log("diouajwidjawd")
    // console.log(x);
    return x
}

const filterByContent = (content) => async (dispatch, state) => {
    const year_state = state().year
    // console.log(year_state)
    year_state.activeFilters.filters.content = content

    const year = await fi_and_so(year_state)
    // console.log(year)
    dispatch(setYearAndMonth({...year}))

}

const filterByAuthor = (author) => async (dispatch, state) => {
    // dispatch(filterByAUTHOR(author))
    const year_state = state().year
    // console.log(year_state)
    year_state.activeFilters.filters.author = author

    const year = await fi_and_so(year_state)
    // console.log(year)
    dispatch(setYearAndMonth({...year}))

}

const sortByLikes = () => async (dispatch, state) => {
    const year_state = state().year
    // console.log(year_state)
    year_state.activeFilters.sorters.likes = true
    year_state.activeFilters.sorters.dislikes = false

    const year = await fi_and_so(year_state)
    // console.log(year)
    dispatch(setYearAndMonth({...year}))
}

const sortByDislikes = () => async (dispatch, state) => {
    const year_state = state().year
    // console.log(year_state)
    year_state.activeFilters.sorters.dislikes = true
    year_state.activeFilters.sorters.likes = false

    const year = await fi_and_so(year_state)
    // console.log(year)
    dispatch(setYearAndMonth({...year}))
}

const sortByLikesNo = () => async (dispatch, state) => {
    const year_state = state().year
    // console.log(year_state)
    year_state.activeFilters.sorters.dislikes = false
    year_state.activeFilters.sorters.likes = false

    const year = await fi_and_so(year_state)
    // console.log(year)
    dispatch(setYearAndMonth({...year}))
}

const sortByXType = (type) => async (dispatch, state) => {
    const year_state = state().year
    // console.log(year_state)
    if (type === "none") {
        year_state.activeFilters.sorters.type = null
    } else {
        year_state.activeFilters.sorters.type = type
    }

    const year = await fi_and_so(year_state)
    // console.log(year)
    dispatch(setYearAndMonth({...year}))
}

const fetch = async (year, month) =>{
    // console.log("pokaz mi: "+month)
    const z = await axios.post(`${api_url}/get_posts_from_year`, {year: year})
    .then(result=>{
        // console.log(result.data.content)
        const months = [
            {
                name: "January",
                days: [
                { day: 1, posts: [] },
                { day: 2, posts: [] },
                { day: 3, posts: [] },
                { day: 4, posts: [] },
                { day: 5, posts: [] },
                { day: 6, posts: [] },
                { day: 7, posts: [] },
                { day: 8, posts: [] },
                { day: 9, posts: [] },
                { day: 10, posts: [] },
                { day: 11, posts: [] },
                { day: 12, posts: [] },
                { day: 13, posts: [] },
                { day: 14, posts: [] },
                { day: 15, posts: [] },
                { day: 16, posts: [] },
                { day: 17, posts: [] },
                { day: 18, posts: [] },
                { day: 19, posts: [] },
                { day: 20, posts: [] },
                { day: 21, posts: [] },
                { day: 22, posts: [] },
                { day: 23, posts: [] },
                { day: 24, posts: [] },
                { day: 25, posts: [] },
                { day: 26, posts: [] },
                { day: 27, posts: [] },
                { day: 28, posts: [] },
                { day: 29, posts: [] },
                { day: 30, posts: [] },
                { day: 31, posts: [] },
                ],
            },
            {
                name: "February",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                ],
            },
            {
                name: "March",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                    { day: 31, posts: [] },
                ],
            },
            {
                name: "April",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                ],  
            },
            {
                name: "May",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                    { day: 31, posts: [] },
                ],
            },
            {
                name: "June",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                ],
            },
            {
                name: "July",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                    { day: 31, posts: [] },
                ],
            },
            {
                name: "August",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                    { day: 31, posts: [] },
                ],
            },
            {
                name: "September",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                ],
            },
            {
                name: "October",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                    { day: 31, posts: [] },
                ],
            },
            {
                name: "November",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                ],
            },
            {
                name: "December",
                days: [
                    { day: 1, posts: [] },
                    { day: 2, posts: [] },
                    { day: 3, posts: [] },
                    { day: 4, posts: [] },
                    { day: 5, posts: [] },
                    { day: 6, posts: [] },
                    { day: 7, posts: [] },
                    { day: 8, posts: [] },
                    { day: 9, posts: [] },
                    { day: 10, posts: [] },
                    { day: 11, posts: [] },
                    { day: 12, posts: [] },
                    { day: 13, posts: [] },
                    { day: 14, posts: [] },
                    { day: 15, posts: [] },
                    { day: 16, posts: [] },
                    { day: 17, posts: [] },
                    { day: 18, posts: [] },
                    { day: 19, posts: [] },
                    { day: 20, posts: [] },
                    { day: 21, posts: [] },
                    { day: 22, posts: [] },
                    { day: 23, posts: [] },
                    { day: 24, posts: [] },
                    { day: 25, posts: [] },
                    { day: 26, posts: [] },
                    { day: 27, posts: [] },
                    { day: 28, posts: [] },
                    { day: 29, posts: [] },
                    { day: 30, posts: [] },
                    { day: 31, posts: [] },
                ],
            }
        ]
        if (year % 4 === 0 || year % 400 === 0 ) {
            months[1].days.push({ day: 29, posts: [] })
        }

        result.data.content.forEach(post=>{
            const postDate = new Date(post.date)
            months[postDate.getMonth()].days[postDate.getDate()-1].posts.push(post)
        })
        // console.log(months)

        const obj = {
            name: year,
            months: months,
            month_to_display: months[month],
            month_to_display_and_apply_filters: months[month],
            posts: result.data.content
        }
        // dispatch(updateYearPosts(obj))
        // dispatch(setYearAndMonth(obj))
        // console.log("OBIEKCIK");
        // console.log(obj)
        return obj
    })
    .catch(err=>{
        console.log(err);
        return null
    })
    return z
}
const get_posts_from_year = (year, month) => async (dispatch) => {
    // console.log(month)
    // console.log("FETCHING POSTS")
    const x = await fetch(year, month)
    // console.log("what is X")
    // console.log(x)
    if (x !== null) {
        dispatch(setYearAndMonth(x))
    } else {
        alert("ERROR")
    }
}

const likePost = (id) => async (dispatch, state) => {
    axios.post(`${api_url}/like_post`, {id: id})
    .then( async result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const likeComment = (id) => async (dispatch, state) => {
    axios.post(`${api_url}/like_comment`, {id: id})
    .then( async result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const editPost = (id, new_content) => async (dispatch, state) => {
    axios.post(`${api_url}/edit_post`, {id: id, new_content: new_content})
    .then( async result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const editComment = (id, new_content) => async (dispatch, state) => {
    axios.post(`${api_url}/edit_comment`, {id: id, new_content: new_content})
    .then( async result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const dislikePost = (id) => async (dispatch, state) => {
    axios.post(`${api_url}/dislike_post`, {id: id})
    .then( async result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const dislikeComment = (id) => async (dispatch, state) => {
    axios.post(`${api_url}/dislike_comment`, {id: id})
    .then( async result => {
        console.log(result)
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const addComment = (id, content, author) => async (dispatch, state) => {
    axios.post(`${api_url}/comment_post`, {
        id: id,
        comment: content,
        author: author
    })
    .then(async result => {
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
            alert("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const addPost = (data_object) => async (dispatch, state) => {
    axios.post(`${api_url}/add_post`, data_object)
    .then(async result => {
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
                alert("Post has been added")
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
            alert("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const removePost = (id) => async (dispatch, state) => {
    axios.post(`${api_url}/remove_post`, {id: id,})
    .then(async result => {
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
            alert("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const removeComment = (id) => async (dispatch, state) => {
    axios.post(`${api_url}/remove_comment`, {id: id,})
    .then(async result => {
        if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
            const year_state = state().year
            console.log(year_state)
            console.log("FETCHING POSTS")
            const x = await fetch(year_state.name, monthsNames.indexOf(year_state.month_to_display.name))
            if (x !== null) {
                dispatch(setYearAndMonth(x))
            } else {
                alert("ERROR")
            }
        } else {
            console.log("error")
            alert("error")
        }
    })
    .catch(err=>{
        console.log(err)
        alert("error")
    })
}

const operations = {
    getYearAndMonth,
    changeMonth,
    login,
    logout,
    filterByAuthor,
    sortByLikes,
    sortByDislikes,
    likePost,
    dislikePost,
    get_posts_from_year,
    addComment,
    removePost,
    addPost,
    filterByContent,
    sortByXType,
    sortByLikesNo,
    editPost,
    removeComment,
    editComment,
    dislikeComment,
    likeComment
}
  
export default operations