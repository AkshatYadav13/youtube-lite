import React, { useEffect } from 'react'
import { CommentsAPi, formatNumber } from '../constants/ytApi'
import { daysAgo } from '../constants/ytApi'
import css from "../css/watch.module.css";
import { useState,useRef } from 'react';
import AccLogo from './AccLogo';

const Comments = ({singleVideo,videoId}) => {

    const [comments,setComments] = useState([])
    const [commentPage,setCommentPage] = useState('')
    const commentBoxRef = useRef(null)
    const debounceCommentRef = useRef(null)  
    const [currVideoId,setCurrVideoId] = useState(null)

    async function getVideoComments(){
      try {
        const res = await fetch(`${CommentsAPi}&videoId=${videoId}&pageToken=${commentPage}`)
        const data = await res.json()
        const newComments = (videoId===currVideoId)  ? [...comments,...data.items] : data.items
        
          setComments(newComments)
          setCommentPage(data.nextPageToken || '')
        } catch (error) {
          console.log(error)
        }finally{
          setCurrVideoId(videoId)
        }
    }    


    function handleCommentScroll(){
        if(debounceCommentRef.current){
          clearTimeout(debounceCommentRef.current)
        }
        debounceCommentRef.current = setTimeout(()=>{
          const commentbox = commentBoxRef.current
          if(commentbox.scrollTop + commentbox.clientHeight>= commentbox.scrollHeight -100){
            getVideoComments()
          }
        },500)
    }    

    useEffect(()=>{
        const commentbox = commentBoxRef.current
        commentbox.addEventListener('scroll',handleCommentScroll)
    
        return ()=> {
          commentbox.removeEventListener('scroll',handleCommentScroll)
          clearTimeout(debounceCommentRef.current)
        }
    },[commentPage])
    

    useEffect(()=>{
      setComments([]);
      setCommentPage('')
      getVideoComments()
    },[videoId])

  return (
    <div ref={commentBoxRef} className={`${css.commentSection} scrollbar`}>
      {comments?.length<=0 ? 
      <p style={{marginBottom:'2rem'}} >Comments will be shown after live session..</p> 
      : 
      <>
      <h1>{`${formatNumber(`${singleVideo?.statistics?.commentCount}`)} Comments`}</h1>
      <div className={css.commentwrap}  >
      {comments?.map((comment,idx)=>(
          <div className={css.comContainer} key={idx} >
          <AccLogo
              size={40}
              url={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          ></AccLogo>
          <div>
              <span  style={{marginRight:'10px',backgroundColor:'lightgray',color:'black',paddingInline:"10px",borderRadius:'10px'}}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
              <span>{daysAgo(comment.snippet.topLevelComment.snippet.updatedAt.split('T')[0])>0 ?` ${daysAgo(comment.snippet.topLevelComment.snippet.updatedAt.split('T')[0])} days ago`: 'today' }</span>
              <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>

              <div style={{display:'flex',alignItems:'center',gap:'20px'}} >
              <div style={{display:'flex',alignItems:'center',gap:'5px'}} >
                  {formatNumber(comment.snippet.topLevelComment.snippet.likeCount)}
                  <span style={{fontSize:'25px'}}  className="material-symbols-outlined">thumb_up</span>
              </div>
              <span>{formatNumber(comment.snippet.totalReplyCount)} replies</span>
              </div>
          </div>
          </div>
          ))}
      </div>          
      </>
    }
    </div>
)
}

export default Comments