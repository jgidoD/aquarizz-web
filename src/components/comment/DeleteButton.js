import './DeleteButton.css'
import { UserAuth } from '../../context/AuthContext'
import { db } from '../../firebaseConfig'
import {doc, deleteDoc, collection, getDocs} from 'firebase/firestore'


//props will receive postRefID, userID, and authorID(post/comment)
const DeleteButton = (props) =>{
    const {user} = UserAuth()
  const userID = props.userID
   const authorIdComment = props.authorIdComment
    const postId = props.postId
    const fetchData = props.doThis

  
   const handleDelete = async (e) =>{
    e.preventDefault()

    try {
        const postRef = doc(db, "posts", postId)
        const commentRef = collection(postRef, "comments")
        await deleteDoc(postRef)
        alert("Post deleted")
        fetchData()
    }catch(err){
        console.log(err.message)
    }

    // console.log(postId)
    
   }

    return(
       <input type='button' value="Delete" onClick={handleDelete} disabled={userID !== authorIdComment}/>
 
        
       )
}
export default DeleteButton