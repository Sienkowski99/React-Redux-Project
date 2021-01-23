import { useParams } from "react-router-dom";
import Post from "./Post"
import auth from '../components/auth'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

const ViewPost = (props) => {
    const params = useParams()
    console.log(params.postId)
    console.log(props.location.post)
    return (
        <div>
            <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Link to="/dashboard"><h1>Dashboard</h1></Link>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
                <Button variant="contained" color="primary" onClick={()=>{auth.logout(()=>props.history.push("/"))}}>Log out</Button>
            </nav>
            <div>   
                <Post post={props.location.post}/>
            </div>
        </div>
    )
}
export default ViewPost;