import Comment from "./Comment"
import axios from 'axios'
import operations from '../operations/index'
import { connect } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const PostPreview = (props) => {

    const [comment_content, setComment_content] = useState("")
    // console.log("POST HERE"+JSON.stringify(props))
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
        props.likePost(id)
    }

    const handleDisLike = (id) => { 
        props.dislikePost(id)
    }

    const handleRemovePost = (id) => {
        if (window.confirm("Are you sure you want to remove this post?")) {
            props.removePost(id)
        }
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
        <div style={comment_div_style} 
        // onClick={()=>{
        //     console.log("Post has been clicked");
        //     console.log(props.post.id)
        // }}
        >
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{width: "20%", display: "flex", flexDirection: "column"}}>
                    <h2>{props.post.author} </h2>
                    <h2>{new Date(props.post.date).getHours()}:{new Date(props.post.date).getMinutes()}</h2>
                </div>
                <div style={{border: "solid black 1px", paddiing: "5px", height: "100%", flexGrow: "1", wordWrap: "break-word"}}>
                    <p>{props.post.content}</p>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{display: "flex", flexDirection: "row", width:"20%", justifyContent: "center"}}>
                    <p>{props.post.likes}</p>
                    <button style={like_dislike_btn_style} onClick={()=>handleLike(props.post.id)}>👍</button>
                    <p>{props.post.dislikes}</p>
                    <button style={like_dislike_btn_style} onClick={()=>handleDisLike(props.post.id)}>👎</button>
                </div>
                
                <div style={{justifySelf: "center", width: "80%"}}>
                    <Link to={{pathname: `posts/${props.post.id}`, post:{...props.post}}} style={{ textDecoration: 'none', color: "white" }}>
                        <p style={{fontWeight: "bold", color: "orange", letterSpacing: "2px"}}>Click here to see more</p>
                    </Link>
                </div>
                
            </div>
            {props.post.author === props.auth.user ? <button style={{position: "absolute"}} onClick={()=>{handleRemovePost(props.post.id)}}>❌</button> : null}
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
        removePost: (id) => dispatch(operations.removePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);

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