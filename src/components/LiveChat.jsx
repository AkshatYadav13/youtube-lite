import React, { useEffect, useState } from "react";
import Chatmsg from "./Chatmsg";
import { useDispatch, useSelector } from "react-redux";
import { LiveChatApi, LiveChatIdAPi } from "../constants/ytApi";
import {  setMessage } from "../utils/chatSlice";


const LiveChat = () => {
  const {islive,singleVideo} = useSelector(store => store.app)
  const message = useSelector((store) => store.chat.message);
  const [pageToken,setPageToken] = useState('')
  const dispatch = useDispatch()
  const videoId = singleVideo.id
  
  
  async function fetchLiveChat(liveChatId){
    try {
      const res = await fetch(`${LiveChatApi}&pageToken=${pageToken}&liveChatId=${liveChatId}`)
      const data = await res.json()
      setPageToken(data.nextPageToken)
      dispatch(setMessage(data.items))
    } catch (error) {
      console.log(error)
    }
  }
  
  async function fetchLiveChatID(){
    try {
      const res = await fetch(LiveChatIdAPi + videoId)
      const data = await res.json()
      const liveChatId = data.items[0].liveStreamingDetails.activeLiveChatId
      if(liveChatId){
        fetchLiveChat(liveChatId)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    let timer
    if(islive){
      fetchLiveChatID()
      timer = setInterval(()=>{
        fetchLiveChatID()
      },3000)
    }
    return ()=>{
      clearInterval(timer)
    }
  },[islive])


  return (
    <>
      {message.map((msg,index) => (
        <Chatmsg key={index} msg={msg} ></Chatmsg>
      ))}
    </>
  );
};

export default LiveChat;
