import Comment from "./Comment"
import axios from 'axios'
import operations from '../operations/index'
import { connect } from "react-redux";
import { useState } from "react";

const Post = (props) => {

    const [comment_content, setComment_content] = useState("")
    // console.log("POST HERE"+JSON.stringify(props))
    const comment_div_style = {
        border: "solid black 2px",
        padding: "5px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey",
    }

    const handleAddComment = (e, id) => {
        e.preventDefault()
        console.log(e.target)
        console.log("post id "+id)
        axios.post("http://localhost:8080/comment_post", {
            year: props.year.name,
            month: props.year.month_to_display.name,
            day: props.day,
            post_id: id,
            comment: comment_content,
            author: props.auth.user
        })
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                props.setYear(props.year.name, props.year.month_to_display.name)
            } else {
                console.log("error")
            }
        })
        .catch(err=>console.log(err))
    } 

    const handleLike = (id) => {
        console.log("post id "+id)
        axios.post("http://localhost:8080/like_post", {
            year: props.year.name,
            month: props.year.month_to_display.name,
            day: props.day,
            post_id: id
        })
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                props.setYear(props.year.name, props.year.month_to_display.name)
            } else {
                console.log("error")
            }
        })
        .catch(err=>console.log(err))
    }

    const handleDisLike = (id) => {
        console.log("post id "+id)
        axios.post("http://localhost:8080/dislike_post", {
            year: props.year.name,
            month: props.year.month_to_display.name,
            day: props.day,
            post_id: id
        })
        .then(result => {
            if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
                props.setYear(props.year.name, props.year.month_to_display.name)
            } else {
                console.log("error")
            }
        })
        .catch(err=>console.log(err))
    }

    const like_dislike_btn_style = {
        background: "none",
        border: "none",
        "&:hover": {
            background: "black",
            // backgroundColor: "black"
        }
    }

    return (
        <div style={comment_div_style}>
            <h1>{props.post.author}</h1>
            <p>{props.post.content}</p>
            <div style={{display: "flex", flexDirection: "row"}}>
                <p>{props.post.likes}</p>
                <button style={like_dislike_btn_style} onClick={()=>handleLike(props.post.id)}>👍</button>
                <p>{props.post.dislikes}</p>
                <button style={like_dislike_btn_style} onClick={()=>handleDisLike(props.post.id)}>👎</button>
            </div>
            {props.post.comments.map(comment => <Comment comment={comment}/>)}
            <form onSubmit={(e) => handleAddComment(e, props.post.id)} style={{
                widht: "100%",
                display: "flex",
                justifyContent: "space-around",
                border: "solid black 1px"
            }}>
                <label>Add comment </label>
                <input type="text" style={{width: "50%"}} onChange={(e)=>{setComment_content(e.target.value)}}/>
                <button type="submit">add</button>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        year: state.year,
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setYear: (year, month) => dispatch(operations.getYearAndMonth(year, month)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

// {
//     author: "",
//     content: "",
//     likes: Int8Array,
//     dislikes: Int8Array,
//     comments: [
//         {
//             author: "",
//             content: "",
//             likes: Int8Array,
//             dislikes: Int8Array,
//         }
//     ]
// }