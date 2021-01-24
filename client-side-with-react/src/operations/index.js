import axios from 'axios'
import { set } from 'js-cookie';
import {setYearAndMonth, setMonth, logIN, logOUT, filterByAUTHOR, sortByDISLIKES, sortByLIKES, updateYearPosts} from '../actions'

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

// const filter_and_sorter = (day_to_modify, activeFilters) => {
//     // FILTERS
//     const day = {...day_to_modify}
//     if (activeFilters.filters.author) {
//         day.availablePeople.filter(post => post.author.includes(activeFilters.filters.author) ? true : false)
//     }
//     //SORTERS
//     if (activeFilters.sorters.likes !== null) {
//         if (activeFilters.sorters.likes === "likes_inc") {
//             console.log(day.availablePeople)
//             day.availablePeople.sort((postA, postB) => postA.likes - postB.likes)
//             console.log(day.availablePeople)
//         }
//         if (activeFilters.sorters.likes === "likes_dic") {
//             console.log(day.availablePeople)
//             day.availablePeople.sort((postA, postB) => postB.likes - postA.likes)
//             console.log(day.availablePeople)
//         }
//     }
//     if (activeFilters.sorters.dislikes !== null) {

//         if (activeFilters.sorters.dislikes === "dislikes_inc") {
//             console.log(day.availablePeople)
//             day.availablePeople.sort((postA, postB) => postB.likes - postA.likes)
//             console.log(day.availablePeople)
//         }
//         if (activeFilters.sorters.dislikes === "dislikes_dic") {
//             console.log(day.availablePeople)
//             day.availablePeople.sort((postA, postB) => postA.likes - postB.likes)
//             console.log(day.availablePeople)
//         }
//     }
//     return day
// }

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

const filter_and_sorter = (day_to_modify, activeFilters) => {
    console.log("RECIEVED DAY "+JSON.stringify(day_to_modify.posts))
    const day = {...day_to_modify}
    if (activeFilters.filters.author) {
        day.posts.filter(post => post.author.includes(activeFilters.filters.author) ? true : false)
    }
    //SORTERS
    if (activeFilters.sorters.likes !== null) {
        if (activeFilters.sorters.likes === "inc") {
            day.posts.sort((postA, postB) => postB.likes - postA.likes)
        }
        if (activeFilters.sorters.likes === "dic") {
            day.posts.sort((postA, postB) => postA.likes - postB.likes)
        }
        // activeFilters.sorters.likes === "inc" ? day.availablePeople.sort((postA, postB) => postA.likes - postB.likes) : null
        // activeFilters.sorters.likes === "dic" ? day.availablePeople.sort((postA, postB) => postB.likes - postA.likes) : null
    }
    if (activeFilters.sorters.dislikes !== null) {
        if (activeFilters.sorters.likes === "inc") {
            day.posts.sort((postA, postB) => postB.likes - postA.likes)
        }
        if (activeFilters.sorters.likes === "dic") {
            day.posts.sort((postA, postB) => postA.likes - postB.likes)
        }
    }
    return day
}

const fi_and_so = (year_state) => {
    // let day = {...day_to_change} 
    // console.log(day)
    // console.log(filters_and_sorters)
    // if (filters_and_sorters.filters.author !== '') {
    //     day.posts = day.posts.filter(post => post.author === filters_and_sorters.filters.author)
    // }
    let x = {...year_state}
    
    x.month_to_display_and_apply_filters = {
        name: year_state.month_to_display.name,
        days: year_state.month_to_display.days.map(day=> {
            // let fi_posts = []
            // console.log(day)
            // day.posts.forEach(post=>{
            // //FILTERING
            // console.log("WHDUIOHAIUWHDIOJAIWD")
            // console.log(post.content.toLowerCase().includes(year_state.activeFilters.filters.content.toLowerCase()))
            // if (
            //     post.author.includes(year_state.activeFilters.filters.author) &&
            //     post.content.toLowerCase().includes(year_state.activeFilters.filters.content.toLowerCase())
            // ){fi_posts.push(post)}
            //     //SORTING
            //     console.log()
        
            // })
            
            // return {day: day.day, posts: fi_posts}
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
            // x = x.filter(post => {
            //     return post.content.toLowerCase().includes(year_state.activeFilters.filters.content.toLowerCase())
            // })
            // if (!x.length) {
            //     return {...day, posts: []}
            // } else {
            //     return {...day, posts: [...x]}
            // }
            return {...day, posts: [...x]}
            
        })
    }
    console.log("diouajwidjawd")
    console.log(x);
    return x
}

const filterByContent = (content) => async (dispatch, state) => {
    const year_state = state().year
    console.log(year_state)
    year_state.activeFilters.filters.content = content

    // year_state.month_to_display_and_apply_filters = {
    //     name: year_state.month_to_display.name,
    //     days: year_state.month_to_display.days.map(async day=> await fi_and_so(day, year_state.activeFilters))
    //     //     let fi_posts = []
    //     //     console.log(day)
    //     //     day.posts.forEach(post=>{if (post.author.includes(year_state.activeFilters.filters.author)){fi_posts.push(post)}})
    //     //     return {day: day.day, posts: fi_posts}
    //     // })
    //     // days: year_state.month_to_display.days.map(day => filter_and_sorter(day, year_state.activeFilters))
    //     // days: year_state.month_to_display.days.map(day => {return {day: day.day, posts: day.posts.filter(post => year_state.activeFilters.filters.author ? post.author.includes(new_state.activeFilters.filters.author) : true)}})
    //         // .sort((postA, postB) => new_state.activeFilters.sorters.byL postA.)}})
    // }
    const year = await fi_and_so(year_state)
    console.log(year)
    dispatch(setYearAndMonth({...year}))

}

const filterByAuthor = (author) => async (dispatch, state) => {
    // dispatch(filterByAUTHOR(author))
    const year_state = state().year
    console.log(year_state)
    year_state.activeFilters.filters.author = author

    // year_state.month_to_display_and_apply_filters = {
    //     name: year_state.month_to_display.name,
    //     days: year_state.month_to_display.days.map(day=>{
    //         let fi_posts = []
    //         console.log(day)
    //         day.posts.forEach(post=>{if (post.author.includes(year_state.activeFilters.filters.author)){fi_posts.push(post)}})
    //         return {day: day.day, posts: fi_posts}
    //     })
    //     // days: year_state.month_to_display.days.map(day => filter_and_sorter(day, year_state.activeFilters))
    //     // days: year_state.month_to_display.days.map(day => {return {day: day.day, posts: day.posts.filter(post => year_state.activeFilters.filters.author ? post.author.includes(new_state.activeFilters.filters.author) : true)}})
    //         // .sort((postA, postB) => new_state.activeFilters.sorters.byL postA.)}})
    // }
    const year = await fi_and_so(year_state)
    console.log(year)
    dispatch(setYearAndMonth({...year}))

}

const fetch = async (year, month) =>{
    console.log("pokaz mi: "+month)
    const z = await axios.post("http://localhost:8080/get_posts_from_year", {year: year})
    .then(result=>{
        console.log(result.data.content)
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
        console.log(months)

        const obj = {
            name: year,
            months: months,
            month_to_display: months[month],
            month_to_display_and_apply_filters: months[month],
            posts: result.data.content
        }
        // dispatch(updateYearPosts(obj))
        // dispatch(setYearAndMonth(obj))
        console.log("OBIEKCIK");
        console.log(obj)
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
    console.log("FETCHING POSTS")
    const x = await fetch(year, month)
    console.log("what is X")
    console.log(x)
    if (x !== null) {
        dispatch(setYearAndMonth(x))
    } else {
        alert("ERROR")
    }
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

const likePost = (id) => async (dispatch, state) => {
    axios.post("http://localhost:8080/like_post", {id: id})
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
    axios.post("http://localhost:8080/dislike_post", {id: id})
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
    axios.post("http://localhost:8080/comment_post", {
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
    axios.post("http://localhost:8080/add_post", data_object)
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

const removePost = (id) => async (dispatch, state) => {
    axios.post("http://localhost:8080/remove_post", {id: id,})
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
    filterByContent
}
  
export default operations