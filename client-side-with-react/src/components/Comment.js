import { Button, Card, Modal } from 'react-bootstrap';
import { useState } from "react";
import operations from '../operations/index'
import { connect } from "react-redux";

const Comment = (props) => {

    const [show, setShow] = useState(false);
    const [new_data, setNew_data] = useState(null)
    const handleClose = () => setShow(false);
    // console.log(props)
    // console.log("TU KOMENTARZ GDZIE PROPSY"+props.comment)
    const comment_div_style = {
        // border: "solid blue 2px",
        // width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ababab",
        padding: "5px",
        // justifyContent: "space-around",
        alignItems: "center",
        marginTop: "10px"
    }
    const handleRemoveComment = (id) => {
        if (window.confirm("Are you sure you want to remove this post?")) {
            props.removeComment(id)
        }
    }

    const handleEditComment = (id, new_content) => {
        props.editComment(id, new_content)
    }

    const handleLike = (id) => {
        props.likeComment(id)
    }

    const handleDisLike = (id) => {
        props.dislikeComment(id)
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
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter new comment content</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input onChange={(e)=>{setNew_data(e.target.value)}}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{handleClose()}}>Close</Button>
                    <Button variant="primary" onClick={()=>{
                        handleClose()
                        handleEditComment(props.comment.id, new_data)
                    }}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            <div className="comment" style={{
                marginTop: "10px",
                backgroundColor: "#282C34",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                borderRadius: "25px",
                padding: "10px 10px",
                border: "solid gray 1px"
            }}>
                {/* <div style={{display: "flex", justifyContent: "center", alignItems: "start", marginRight: "10px", color: "orange"}}>
                    <h3 style={{margin: "0", textShadow: "1px 1px black"}}>{props.comment.author}:</h3>
                </div>
                <h4 style={{flexGrow: "1",margin: "0", width: "80%", wordBreak: "break-word"}}>{props.comment.content}</h4> */}
                <div style={{display: "flex", flexDirection: "row", overflowWrap: "break-all", flexWrap: "wrap"}}>
                    <h5 style={{margin: "0", color: "orange", textShadow: "1px 1px black", marginRight: "10px"}}>{props.comment.author}:</h5>
                    <h5 style={{margin: "0", wordBreak: "break-word", textAlign: "start"}}>{props.comment.content}</h5>
                </div>
                <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                        <p style={{margin: "0"}}>{props.comment.likes}</p>
                        <button style={like_dislike_btn_style} onClick={()=>handleLike(props.comment.id)}>👍</button>
                        <p style={{margin: "0"}}>{props.comment.dislikes}</p>
                        <button style={like_dislike_btn_style} onClick={()=>handleDisLike(props.comment.id)}>👎</button>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{margin: "0"}}>{props.comment.author === props.auth.user ? <Button style={{margin: "0", padding: "0", background: "none", border: "none"}} onClick={()=>{setShow(true)}}>🖊️ edit</Button> : null}</p>
                        <p style={{margin: "0 5px"}}>{props.comment.author === props.auth.user ? "/" : null}  </p>
                        <p style={{margin: "0"}}>{props.comment.author === props.auth.user ? <Button style={{margin: "0", padding: "0", background: "none", border: "none"}} onClick={()=>{handleRemoveComment(props.comment.id)}}>remove ❌</Button> : null}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeComment: (id) => dispatch(operations.likeComment(id)),
        dislikeComment: (id) => dispatch(operations.dislikeComment(id)),
        removeComment: (id) => dispatch(operations.removeComment(id)),
        editComment: (id, new_content) => dispatch(operations.editComment(id, new_content))
    }
}

export default connect(null, mapDispatchToProps)(Comment);