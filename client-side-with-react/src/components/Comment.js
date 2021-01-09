const Comment = (props) => {

    // console.log("TU KOMENTARZ GDZIE PROPSY"+props.comment)
    const comment_div_style = {
        // border: "solid blue 2px",
        // width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ababab",
        padding: "5px",
        // justifyContent: "space-around",
        alignItems: "center"
    }

    return (
        <div className="comment" style={comment_div_style}>
            <h3 style={{width: "20%"}}>{props.comment.author} : </h3>
            <p>{props.comment.content}</p>
            <div style={{display: "flex", flexDirection: "row"}}>
                {/* <p>{props.comment.likes}</p>
                <button>👍</button>
                <p>{props.comment.dislikes}</p>
                <button>👎</button> */}
            </div>
        </div>
    )
}

export default Comment;