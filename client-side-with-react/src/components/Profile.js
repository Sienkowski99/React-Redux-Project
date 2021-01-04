import auth from '../components/auth'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'


const Profile = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("updating")
        const data = new FormData()
        data.append("msg", "jaiowdja")
        data.append("avatar", file)
        axios.post('http://localhost:8080/upload_avatar', data).then(result => console.log(result)).catch(err => console.log(err))
    }
    const [file, setFile] = useState()
    return (
        <div className="all">
            <nav style={{backgroundColor: "#FF9311", borderBottom: "solid 3px #FFF1CE", padding: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Link to="/dashboard"><h1>Dashboard</h1></Link>
                <h1 style={{margin: "0", fontSize: "50px", color: "#FFF1CE"}}>Friends Schedule</h1>
                <Button variant="contained" color="primary" onClick={()=>{auth.logout(()=>props.history.push("/"))}}>Log out</Button>
            </nav>
            <h1>Welcome to your profile!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>File </label>
                    <input type="file" id="file" accept=".jpg" onChange={(e)=>{setFile(e.target.files[0])}}/>
                </div>
                <button type="submit">upload</button>
            </form>
        </div>
    )
}
export default Profile;