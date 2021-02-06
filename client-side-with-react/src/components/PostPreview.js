import Comment from "./Comment"
import axios from 'axios'
import operations from '../operations/index'
import { connect } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';

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

    const returnProperDate = () => {
        let date = ""
        const date_obj = new Date(props.post.date)
        parseInt(date_obj.getDate()) < 10 ? date+="0"+date_obj.getDate() : date+=date_obj.getDate()
        // date+=date_obj.getDate()
        // console.log(date)
        date+="."
        parseInt(date_obj.getMonth()+1) < 10 ? date+="0"+(parseInt(date_obj.getMonth())+1) : date+=date_obj.getMonth()+1
        // date+=date_obj.getMonth()+1
        date+="."
        date+=date_obj.getFullYear()
        // console.log(date)
        return date
    }

    const returnProperTime = (hr, mn) => {    
        // console.log(hr, mn)
        let time = ""
        parseInt(hr) < 10 ? time+="0"+hr : time+=hr
        time+=":"
        parseInt(mn) < 10 ? time+="0"+mn : time+=mn
        return time
    }   
    // console.log(props)
    return (
        <div 
        style={{width: "100%"}} 
        // onClick={()=>{
        //     console.log("Post has been clicked");
        //     console.log(props.post.id)
        // }}
        >   
            <Card  bg="dark" text="white" style={{marginBottom: "10px"}}>
                <Card.Header style={{display: "flex"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                        <div style={{display: "flex", justifyContent: "start", alignItems: "center"}}>
                            <h4 style={{margin: "0"}}>{props.post.author}</h4>
                            <div style={{width: "15px"}}></div>
                            <p style={{margin: "0"}}>suggests:</p>
                        </div>
                        <p style={{margin: "0"}}>{returnProperDate()}</p>
                        <p style={{margin: "0"}}>{props.post.author === props.auth.user ? <Button style={{margin: "0", padding: "0", background: "none", border: "none"}} onClick={()=>{handleRemovePost(props.post.id)}}>❌</Button> : null}</p>
                        
                    </div>
                    
                </Card.Header>
                {/* <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center"}}>
                    <Card.Header>{props.post.author}</Card.Header>
                    <Card.Header>{new Date(props.post.date).getHours()}:{new Date(props.post.date).getMinutes()}</Card.Header>
                </div> */}
                <Card.Body>
                    {/* <Card.Title>{props.post.content}</Card.Title> */}
                    {/* <Card.Text>
                    {props.post.content}
                    </Card.Text> */}
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "20%"}}>
                            <h3 style={{margin: "0"}}>{returnProperTime(new Date(props.post.date).getHours(), new Date(props.post.date).getMinutes())}</h3>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                                <p style={{margin: "0"}}>{props.post.likes}</p>
                                <button style={like_dislike_btn_style} onClick={()=>handleLike(props.post.id)}>👍</button>
                                <p style={{margin: "0"}}>{props.post.dislikes}</p>
                                <button style={like_dislike_btn_style} onClick={()=>handleDisLike(props.post.id)}>👎</button>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "80%"}}>
                            <Card.Title>{props.post.content}</Card.Title>
                            <Link to={{pathname: `posts/${props.post.id}`, post:{...props.post}}} style={{ textDecoration: 'none', color: "white" }}>
                                {/* <p style={{fontWeight: "bold", color: "orange", letterSpacing: "2px"}}>Click here to see more</p> */}
                                <Button variant="info" size="sm">Click here to read more</Button>
                            </Link>
                        </div>  
                    </div>
                    
                    
                </Card.Body>
            </Card>
            {/* <div style={{display: "flex", flexDirection: "row"}}>
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
                    <p style={{margin: "0"}}>{props.post.likes}</p>
                    <button style={like_dislike_btn_style} onClick={()=>handleLike(props.post.id)}>👍</button>
                    <p style={{margin: "0"}}>{props.post.dislikes}</p>
                    <button style={like_dislike_btn_style} onClick={()=>handleDisLike(props.post.id)}>👎</button>
                </div>
                
                <div style={{justifySelf: "center", width: "80%"}}>
                    <Link to={{pathname: `posts/${props.post.id}`, post:{...props.post}}} style={{ textDecoration: 'none', color: "white" }}>
                        <p style={{fontWeight: "bold", color: "orange", letterSpacing: "2px"}}>Click here to see more</p>
                    </Link>
                </div>
                
            </div> */}
            {/* {props.post.author === props.auth.user ? <Button style={{position: "absolute", background: "none", border: "none"}} onClick={()=>{handleRemovePost(props.post.id)}}>❌</Button> : null} */}
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