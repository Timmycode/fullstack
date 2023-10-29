import React, {useEffect, useState,useContext} from 'react'
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext'

function Post() {
  let {id} = useParams();
const [postObject, setPostObject] = useState({});
const [comments, setComments] = useState([]);
const [newComment, setNewComment]= useState("");
const{authState} = useContext(AuthContext);

let navigate = useNavigate();
 
  useEffect(() =>{
    axios.get(`https://backend-blog-0lbc.onrender.com/posts/byId/${id}`).then((response) =>{
    setPostObject(response.data);
    console.log(response.data);
  });
});

  
    axios.get(`https://backend-blog-0lbc.onrender.com/comments/${id}`).then((response) =>{
    setComments(response.data)
  },[]);

      
const addComment = () =>{
    axios.post ("https://backend-blog-0lbc.onrender.com/comments", {commentBody: newComment, PostId:id },
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
       },
    }

    )
    .then((response) => {
      if(response.data.error){
        alert(response.data.error);
      }
      else{
        const commentToAdd = {commentBody: newComment}
        setComments([...comments, commentToAdd]);
        setNewComment("");
      }
      
    });
}
 
const deleteComment = (id) => {
axios.delete(`https://backend-blog-0lbc.onrender.com/comments/${id}`, {headers: { accessToken: localStorage.getItem('accessToken')},
}).then(() => {
  alert("Token Deleted")
});
};

const deletePost = (id) => {
axios.get(`https://backend-blog-0lbc.onrender.com/posts/delId/${id}`,{headers: { accessToken: localStorage.getItem('accessToken')},
}).then(() => {
    navigate("/")
    console.log(postObject);
});
}
const editPost = (option) => {
  if (option === "title"){
    let newTitle = prompt("Enter New Title: ");
    console.log(newTitle);
    axios.put("https://backend-blog-0lbc.onrender.com/title", {
      newTitle: newTitle, 
      id:id,
    },
    {
      headers: { accessToken: localStorage.getItem('accessToken')},
    }
    );

    setPostObject({...postObject, postText: newTitle});
  }
  else{
    let newPostText = prompt("Enter New Text: ");
    axios.put("https://backend-blog-0lbc.onrender.com/posts/postText", {
      newText: newPostText, 
      id:id,
    },
    {
      headers: { accessToken: localStorage.getItem('accessToken')},
    }
    );

    setPostObject({...postObject, postText: newPostText});
  }
}

    return (
    <div className="postPage" id="individual">
        <div className="leftSide">
            <div className="title1" onClick={ () => {
              if(authState.username  === postObject.username){
                editPost("title")
              }
            }}
          >
            {postObject.title}
            </div>
            <div className="postObject1"onClick={() => {
              if(authState.username  === postObject.username){
              editPost("postObject")
              }
            }}> 
              {postObject.postText}
            </div>
            <div className="username1">{postObject.username}
            {authState.username === postObject.username &&(
              <button onClick={() => {
                deletePost(postObject.id)
              }}> Delete Post </button>
            )}
          </div>
        </div>
        <div className="rightSide">
            <div className="addCommentContainer">
            <input type="text" placeholder="Comment..." autoComplete='off' value={newComment} onChange = {(event) => {setNewComment(event.target.value)}}/>
            <button onClick={addComment}>Add Comments</button>
            </div>
            <div className="listOfComments">       
              {comments.map((comment, key) => {
                return<div key={key} className="comment">{comment.commentBody}
                <label className='lab'>Username: {comment.username}</label>
               {authState.username === comment.username && 
               <button onClick={() =>{deleteComment(comment.id)}}> X </button>} 
                </div>
              })} 
            </div>
        </div>
    </div>
  )
}

export default Post