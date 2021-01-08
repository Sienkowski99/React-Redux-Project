import Post from "./Post"

const Day = (props) => {
    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>{props.data.day}</h1>
            {props.data.availablePeople.map(ppl => <Post post={ppl} day={props.data.day}/>)}
        </div>
    )
}

export default Day;
