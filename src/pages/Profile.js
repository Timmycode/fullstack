import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext'

function Profile() {
    let {id} = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState();
    const [listOfPosts, setListOfPosts] = useState([]);
    const{authState} = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://backend-blog-0lbc.onrender.com/auth/basicinfo/${id}`).then((response) => {
     setUsername(response.data.username);
     console.log(response.data.username);
    },[]);

    axios.get(`https://backend-blog-0lbc.onrender.com/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    })
  }, [id])
  return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1>Username: {username}</h1>
           {authState.username === username && (
              <button onClick={() => {navigate('/changepassword')}}>Change My Password</button>
            )}
        </div>
        <div className='listOfPosts'>
        {listOfPosts.map((value, key) => {
    return (
      <div className='post' key={key}>
        <div className='title'> {value.title}</div>
        <div className='body'  onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText}</div>
        <div className='footer'> {value.username}
        
        <label>{value.Likes.length}</label>
        </div>
      </div>
    );
    })}
 </div>
    </div>
  )
}

export default Profile