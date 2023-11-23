import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

    const Header = () => {
    const [userName, SetUserName] = useState(null)

    //accessing the username after log in
    useEffect(()=>{
        const getUsername = async ()=>{
        const myAccessToken = localStorage.getItem('access_token');
        const response = await fetch('https://api.spotify.com/v1/me',{
       method: "GET",
       headers: {
        Authorization: `Bearer ${myAccessToken}`
      }
    })
    console.log(response)
       const data =await response.json()
       SetUserName(data.display_name)
        }
       getUsername()
    },[])
   
    return(
        <div>
          <div className="header_container">
         
                <div>
                    <Link to='/app'>
                        <img className="spotifyImg"
                        src="https://toppng.com/uploads/preview/spotify-icon-spotify-logo-black-and-white-11563065230ukmcxtnjge.png"
                        alt="Spotify Logo" />  
                    </Link> 
                </div>
           
                <div>
                    <p>Spotify Playlist Seive</p>
                </div>
                <div>
                    <p>Hi {userName}</p>
                </div>
          </div>
        </div>
    )
}
export default Header