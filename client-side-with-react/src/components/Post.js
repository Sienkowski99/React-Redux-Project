import Comment from "./Comment"
import axios from 'axios'
import operations from '../operations/index'
import { connect } from "react-redux";
import { useState } from "react";
import { Button, Card, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Post = (props) => {

    const [comment_content, setComment_content] = useState("")

    const handleRemovePost = (id) => {
        if (window.confirm("Are you sure you want to remove this post?")) {
            props.removePost(id)
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
        if (comment_content !== "") {
            // console.log(e.target)
            console.log("post id "+id)
            props.addComment(id, comment_content, props.auth.user)
        } else {
            alert("Don't be so shy - write something!")
        }
        
    } 

    const handleLike = (id) => {
        props.likePost(id)
    }

    const handleDisLike = (id) => {
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

    const handleEditPost= (id, new_content) => {
        props.editPost(id, new_content)
    }

    function resetForm() {
        document.getElementById("myForm").reset();
    }

    const [new_data, setNew_data] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter new post content</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input style={{width: "100%"}} onChange={(e)=>{setNew_data(e.target.value)}}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleClose()}}>Close</Button>
                    <Button variant="primary" onClick={()=>{
                        if (new_data === null || new_data === "") {
                            alert("Don't leave it empty!")
                        } else {
                            handleClose()
                            handleEditPost(props.post.id, new_data)
                        }
                    }}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            <div 
                // style={comment_div_style}
                style={{width: "100%", marginTop: "10px"}}
            >   
                <Card  bg="dark" text="white" style={{marginBottom: "10px"}}>
                    <Card.Header style={{display: "flex"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                            <p style={{margin: "0"}}>{props.post.author}</p>
                            <p style={{margin: "0", alignSelf: "center"}}>{returnProperDate()}</p>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <p style={{margin: "0"}}>{props.post.author === props.auth.user ? <Button style={{margin: "0", padding: "0", background: "none", border: "none"}} onClick={()=>{setShow(true)}}>🖊️ edit</Button> : null}</p>
                                <p style={{margin: "0 5px"}}>{props.post.author === props.auth.user ? "/" : null}  </p>
                                <p style={{margin: "0"}}>{props.post.author === props.auth.user ? <Button style={{margin: "0", padding: "0", background: "none", border: "none"}} onClick={()=>{handleRemovePost(props.post.id)}}>remove ❌</Button> : null}</p>
                            </div>
                            
                        </div>
                        
                    </Card.Header>
                    <Card.Body>
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
                                    {/* <Button variant="info" size="sm">Click here to read more</Button> */}
                                </Link>
                            </div>  
                        </div>
                        {props.post.comments.map(comment => <Comment comment={comment} auth={props.auth}/>)}
                        <div>
                            <form onSubmit={(e) => {handleAddComment(e, props.post.id); resetForm();}} id="myForm" style={{
                                widht: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                // border: "solid black 1px",
                                margin: "10px 0"
                            }}>
                                {/* <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "10%"}}>
                                    <Button variant="info">Text</Button>
                                </div> */}
                                {/* <label variant="info">Text</label> */}
                                <input placeholder="Write something..." type="text" style={{flexGrow: "1", backgroundColor: "#282C34", color: "white"}} onChange={(e)=>{setComment_content(e.target.value)}}/>
                                <Button type="submit" style={{justifySelf:"flex-end"}} variant="danger">Send 💬</Button>
                            </form>
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
                </form> */}
            </div>
        </>
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
        addComment: (id, content, author) => dispatch(operations.addComment(id, content, author)),
        removePost: (id) => dispatch(operations.removePost(id)),
        editPost: (id, new_content) => dispatch(operations.editPost(id, new_content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
