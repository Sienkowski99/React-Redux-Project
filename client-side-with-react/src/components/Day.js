import { useEffect, useState } from "react"
import Post from "./Post"
import PostPreview from "./PostPreview"

const Day = (props) => {

    const [hide, setHide] = useState(null)
    useEffect(()=>{
        // console.log(props.data.availablePeople.length)
        if (props.data.availablePeople.length > 2) {
            setHide(true)
        }
    }, [props])

    let toDisplay = []
    const returnPosts = (posts) => {
        // console.log(hide)
        // if (posts.length >= 2) {
        //     // setHide(true)
        //     // console.log
        // }
        if (hide) {
            // return (props.data.availablePeople.slice(2).map(ppl => <PostPreview post={ppl} day={props.data.day}/>))
            toDisplay = [props.data.availablePeople[0],props.data.availablePeople[1]]
        } else {
            // return(props.data.availablePeople.map(ppl => <PostPreview post={ppl} day={props.data.day}/>))
            toDisplay = props.data.availablePeople
        }
        return(toDisplay.map(ppl => <PostPreview post={ppl} day={props.data.day}/>))
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", borderTop: "solid white 2px", marginTop: "10px"}}>
            <h1>{props.data.day}</h1>
            {returnPosts(props.data.availablePeople)}
            {/* {hide ? props.data.availablePeople.slice(2).map(ppl => <PostPreview post={ppl} day={props.data.day}/>) : props.data.availablePeople.map(ppl => <PostPreview post={ppl} day={props.data.day}/>)} */}
            {hide !== null ? !hide ? <button onClick={()=>{setHide(true)}}>Hide</button> : <button onClick={()=>{setHide(false)}}>Show more</button> : null}
            {/* {hide ? <button onClick={()=>{hide = true}}>Hide</button> : <button onClick={()=>{hide = false}}>Show more</button>} */}
            {/* {props.data.availablePeople.map(ppl => <PostPreview post={ppl} day={props.data.day}/>)} */}
        </div>
    )
}

export default Day;
