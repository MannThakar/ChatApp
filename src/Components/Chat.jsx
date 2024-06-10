import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db, auth } from "../Config/Firebase";

const Chat = ({ room }) => {
    const [messages, setMessages] = useState('');
    const messageRef = collection(db, 'messages');
    const [arrmsg, setArrmsg] = useState([]);

    useEffect(() => {
        const queryMessage = query(messageRef, where("room", "==", room), orderBy('createdAt'));
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
        <div className="flex flex-col h-screen bg-slate-100 text-white">
            <div className="flex-grow overflow-y-auto px-4 py-8">
                {arrmsg.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.user === auth.currentUser.displayName ? 'ml-auto' : 'mr-auto'}`}>
                        <div className="bg-pink-500 rounded-lg w-fit px-4 py-2 shadow-md text-sm">
                            <p className="font-semibold text-baf3ed">{msg.user}</p>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex justify-between items-center px-4 py-2">
                <input type="text" name="message" id="message" placeholder="Type your message here"
                    onChange={(e) => setMessages(e.target.value)} value={messages}
                    className="flex-grow mr-2 px-4 py-2 bg-slate-300 text-gray-800 rounded-xl focus:outline-none focus:ring focus:ring-gray-300"
                />
                <button type="submit" className="px-4 py-2 mr-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-white">Send</button>
                <button onClick={handleExit} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-white">Exit</button>
            </form>
        </div>
    )
}

export default Chat;
