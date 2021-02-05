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
        alignItems: "center",
        marginTop: "10px"
    }

    return (
        <div className="comment" style={{
            marginTop: "10px",
            backgroundColor: "#282C34",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "25px",
            padding: "5px 10px"
        }}>
            <div style={{display: "flex", justifyContent: "center", marginRight: "10px", color: "orange"}}>
                <h3 style={{margin: "0", textShadow: "1px 1px black"}}>{props.comment.author}</h3>
                <h3 style={{margin: "0"}}>: </h3>
            </div>
            <h4 style={{flexGrow: "1",margin: "0", width: "80%", wordBreak: "break-all"}}>{props.comment.content}</h4>
            {/* <div style={{display: "flex", flexDirection: "row"}}>
                <p>{props.comment.likes}</p>
                <button>👍</button>
                <p>{props.comment.dislikes}</p>
                <button>👎</button>
            </div> */}
        </div>
    )
}

export default Comment;