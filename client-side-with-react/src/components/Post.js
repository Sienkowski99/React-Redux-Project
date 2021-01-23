import Comment from "./Comment"
import axios from 'axios'
import operations from '../operations/index'
import { connect } from "react-redux";
import { useState } from "react";

const Post = (props) => {

    const [comment_content, setComment_content] = useState("")

    const comment_div_style = {
        border: "solid black 2px",
        padding: "5px",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey",
        marginBottom: "10px"
    }

    const handleAddComment = (e, id) => {
        e.preventDefault()
        // console.log(e.target)
        // console.log("post id "+id)
        props.addComment(id, comment_content, props.auth.user)
        // axios.post("http://localhost:8080/comment_post", {
        //     post_id: id,
        //     comment: comment_content,
        //     author: props.auth.user
        // })
        // .then(result => {
        //     if (result.data.statusCode >= 200 && result.data.statusCode < 300) {
        //         props.setYear(props.year.name, props.year.month_to_display.name)
        //     } else {
        //         console.log("error")
        //     }
        // })
        // .catch(err=>console.log(err))
    } 

    const handleLike = (id) => {
        // console.log("post id "+id)
        props.likePost(id)
    }

    const handleDisLike = (id) => {
        // console.log("post id "+id)
        props.dislikePost(id)
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
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{width: "20%", display: "flex", flexDirection: "column"}}>
                    <h2>{props.post.author} </h2>
                    <h2>{new Date(props.post.date).getHours()}:{new Date(props.post.date).getMinutes()}</h2>
                </div>
                <div style={{border: "solid black 1px", paddiing: "5px", height: "100%", flexGrow: "1", wordWrap: "break-word"}}>
                    <p>{props.post.content}</p>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", width:"20%", justifyContent: "center"}}>
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
                <button type="submit" style={{justifySelf:"flex-end"}}>Send</button>
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
        likePost: (id) => dispatch(operations.likePost(id)),
        dislikePost: (id) => dispatch(operations.dislikePost(id)),
        addComment: (id, content, author) => dispatch(operations.addComment(id, content, author))
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