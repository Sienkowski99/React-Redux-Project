import operations from '../operations/index'
import { connect } from "react-redux";
import { useState } from 'react';

const PickFilters = (props) => {
    const filter_dov_style = {
        borderBottom: "solid white 2px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "30px",
        marginBottom: "10px"
    }

    const [author_filter, setAuthor_filter] = useState("")

    const handleFilterByAuthor = (author) => {
        console.log("filtering for "+author)
        props.filterByAuthor(author)
    }

    const handleSortByLikes = (type) => {
        console.log("Applying sorting :", type)
        props.sortByLikes(type)
    }
    const handleSortByDislikes = (type) => {
        console.log("Applying sorting :", type)
        props.sortByDislikes(type)
    }

    return(
        <div style={filter_dov_style}>
            <h1>FILTERS</h1>
            <div display={{display: "flex", flexDirection: "row"}}>
                <label>Display posts only written by: </label>
                <input onChange={(e) => handleFilterByAuthor(e.target.value)}></input>
                <label>Sort by likes: </label>
                <select id="sortby" onChange={(e)=>handleSortByLikes(e.target.value)}>
                    <option value="none">None</option>
                    <option value="likes_dic">Most Likes</option>
                    <option value="likes_inc">Least Likes</option>
                </select>
                <label>Sort by dislikes: </label>
                <select id="sortby" onChange={(e)=>handleSortByDislikes(e.target.value)}>
                    <option value="none">None</option>
                    <option value="dislikes_dic">Most Dislikes</option>
                    <option value="dislikes_inc">Least Dislikes</option>
                </select>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        year: state.year,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
        filterByAuthor: (author) => dispatch(operations.filterByAuthor(author)),
        sortByLikes: (type) => dispatch(operations.sortByLikes(type)),
        sortByDislikes: (type) => dispatch(operations.sortByDislikes(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PickFilters);