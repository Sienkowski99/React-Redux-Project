import { useEffect, useState } from "react"
import Post from "./Post"
import PostPreview from "./PostPreview"
import { Button, Card } from 'react-bootstrap';

const Day = (props) => {

    const [hide, setHide] = useState(null)
    const [toDisplay2, setToDisplay2] = useState([])
    useEffect(()=>{
        // console.log(props.data.availablePeople.length)
        if (props.data.posts.length > 2) {
            setHide(true)
            setToDisplay2([props.data.posts[0],props.data.posts[1]])
        } else {
            console.log("MAM ZA MALO POSTOW ZEBY ROBIC HIDE")
            if (props.data.posts.length) {
                setToDisplay2(props.data.posts)
            } else {
                setToDisplay2(null)
            }
        }
        
    }, [props])

    useEffect(()=>{
        // if (hise)
        if (hide) {
            setToDisplay2([props.data.posts[0],props.data.posts[1]])
        } else if (!hide) {
            setToDisplay2(props.data.posts)
        }
    }, [hide])
    // let toDisplay = []
    const returnPosts = () => {
        // console.log(hide)
        // if (posts.length >= 2) {
        //     // setHide(true)
        //     // console.log
        // }
        // if (!posts.length) {
        //     return(null)
        // }
        // if (hide) {
        //     // return (props.data.availablePeople.slice(2).map(ppl => <PostPreview post={ppl} day={props.data.day}/>))
        //     toDisplay = [props.data.posts[0],props.data.posts[1]]
        // } else {
        //     // return(props.data.availablePeople.map(ppl => <PostPreview post={ppl} day={props.data.day}/>))
        //     toDisplay = props.data.posts
        // }
        if (toDisplay2 !== null) {
            if (props.data.posts.length > 2) {
                return(
                    <div style={{width: "100%"}}>
                        {toDisplay2.map(ppl => <PostPreview post={ppl} day={props.data.day}/>)}
                        {hide !== null ? !hide ? <Button onClick={()=>{setHide(true)}} variant="secondary" style={{width: "100%"}}>Hide</Button> : <Button onClick={()=>{setHide(false)}} style={{width: "100%"}} variant="secondary">Show more</Button> : null}
                    </div>
                )
            } else {
                return(
                    <div style={{width: "100%"}}>
                        {toDisplay2.map(ppl => <PostPreview post={ppl} day={props.data.day}/>)}
                    </div>
                )
            }
            
        } else {
            return (null)
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", borderTop: "solid white 2px", marginTop: "10px"}}>
            <h1>{props.data.day}</h1>
            {/* {returnPosts(props.data.posts)} */}
            {returnPosts()}
            {/* {hide ? props.data.availablePeople.slice(2).map(ppl => <PostPreview post={ppl} day={props.data.day}/>) : props.data.availablePeople.map(ppl => <PostPreview post={ppl} day={props.data.day}/>)} */}
            {/* {hide !== null ? !hide ? <Button onClick={()=>{setHide(true)}} variant="secondary">Hide</Button> : <Button onClick={()=>{setHide(false)}} variant="secondary">Show more</Button> : null} */}
            {/* {hide ? <button onClick={()=>{hide = true}}>Hide</button> : <button onClick={()=>{hide = false}}>Show more</button>} */}
            {/* {props.data.availablePeople.map(ppl => <PostPreview post={ppl} day={props.data.day}/>)} */}
        </div>
    )
}

export default Day;
