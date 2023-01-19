import React, { useState, useEffect } from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, Search, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import db from './firebase';
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';
 
function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValue();


    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => {
                    setRoomName(snapshot.data().name)
                })
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ));
        }
        setSeed(Math.floor(Math.random() * 5000));

    }, [roomId]);

useEffect(() => { }, []);
        

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(`you typed ${ input }`);
        db.collection("rooms").doc(roomId).collection("messages").add({
			message : input,
			name : user.displayName,
			timestamp : firebase.firestore.FieldValue.serverTimestamp(),
		});
      

        setInput("");
    }

    return (
        <div className='chat'>
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{ roomName }</h3>
                    <p>last seen at{" "}
                    { new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                       <Search />
                    </IconButton>
                   
                    <IconButton>
                      <AttachFile />
                    </IconButton>
                    
                    <IconButton>
                       <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p key={message.id} className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{ message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                        {new Date(message.timestamp?.seconds*1000).toLocaleTimeString()}
                        </span>   
                        </p>
                ))}    
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Type a message' type="text" />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    );
}

export default Chat;