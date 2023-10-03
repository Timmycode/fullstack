import React, { useContext } from 'react'
import axios from "axios";
import { useEffect,useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext'

function Home() {
 
 const [listOfPosts, setListOfPosts] = useState([]);
 const{authState} = useContext(AuthContext);
 let navigate = useNavigate();

 useEffect(() =>{

  if (!localStorage.getItem("accessToken")){
    navigate("/login");
  }
  else{
    axios.get("http://localhost:3001/posts").then((response) =>{
      setListOfPosts(response.data);
      console.log(response.data);
          })
  }
 },[])

    const likeAPost = (postId) => {
    axios.post("http://localhost:3001/likes", {PostId: postId}, {headers: {accessToken: localStorage.getItem("accessToken")}}
    ).then((response) => {
      /*if(response.data.liked === true){
        alert("You Like this post");
      }

      else{
        alert("You Unlike this post");
      }*/

      //const message = response.data.liked?'liked' : 'unlike';
      alert(response.data.liked?'liked' : 'unlike');
      

      setListOfPosts(listOfPosts.map((post) => {
        if(post.id === postId){
          if (response.data.liked){
        
            return{ ...post, Likes: [...post.Likes, 0]};
          }
          else{
            const likesArray = post.Likes
            likesArray.pop()
            return{ ...post, Likes:  likesArray};
          }
          
        }
        else{
          return post
        }
      }))
    })
    };

  return (
    <div className='App'>
           {listOfPosts.map((value, key) => {
    return (
      <div className='post'>
        <div className='title'> {value.title}</div>
        <div className='body'  onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText}</div>
        <div className='footer'> 
        <div className='footer'>
          <div className='username'>
          <Link to={`/profile/${value.username}`} className="white-link">{value.username}</Link>
          </div>
         </div>
        <button onClick={() =>{
          likeAPost(value.id)
          }}> Like </button>
        
       <label>{value.Likes.length}</label>
        </div>
      </div>
    );
    })}
    </div>
  );
}

export default Home