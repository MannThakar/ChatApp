/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db, auth } from "../Config/Firebase";


const Chat = ({ room }) => {


    console.log(room)
    const [messages, setMessages] = useState('');
    const messageRef = collection(db, 'messages');
    const [arrmsg, setArrmsg] = useState([]);
    

    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", room),orderBy('createdAt'));
        const unsubscribe = onSnapshot(queryMessage, (querySnapshot) => {
            let msg = []
            querySnapshot.forEach((doc) => {
                msg.push({ ...doc.data(), id: doc.id })
            })
            setArrmsg(msg)
        })

        return () => unsubscribe();
    }, []);


    function handleExit() {
        localStorage.removeItem("room");
        window.location.reload();
    }


    async function handleSubmit(e) {
        e.preventDefault()
        if (messages === '') return;

        await addDoc(messageRef, {
            text: messages,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        });
    }
    return (
        <>
            <div>
                {arrmsg.map((msg) => (

                    <p><span>{msg.user}</span>{msg.text}</p>


                ))}
            </div>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="message" id="message" placeholder="Type your message here"
                    onChange={(e) => setMessages(e.target.value)} value={messages} />
                <button type="submit">Send</button>

                <button onClick={handleExit}>Exit</button>
            </form>
        </>
    )
}

export default Chat