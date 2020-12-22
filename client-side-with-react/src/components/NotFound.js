import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <div>
            <h1>ERROR 404</h1>
            <h4>Page not found</h4>
            <p></p>
            <Link to='/'><p>Go back to main page</p></Link>
        </div>
    )
}
  
export default NotFound;