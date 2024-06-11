import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../Config/Firebase";

const Chat = ({ room }) => {
  const [messages, setMessages] = useState("");
  const messageRef = collection(db, "messages");
  const [arrmsg, setArrmsg] = useState([]);
  const chatRef = useRef(null);

  //   useEffect(() => {
  //     const queryMessage = query(
  //       messageRef,
  //       where("room", "==", room),
  //       orderBy("createdAt")
  //     );
  //     const unsubscribe = onSnapshot(queryMessage, (querySnapshot) => {
  //       let msg = [];
  //       querySnapshot.forEach((doc) => {
  //         msg.push({ ...doc.data(), id: doc.id });
  //       });
  //       setArrmsg(msg);
  //     });

  //     return () => unsubscribe();
  //   }, []);

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessage, (querySnapshot) => {
      let msg = [];
      querySnapshot.forEach((doc) => {
        msg.push({ ...doc.data(), id: doc.id });
      });
      setArrmsg(msg);

      // Scroll to the bottom of the chat when new messages are received
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    });

    return () => unsubscribe();
  }, []);

  function handleExit() {
    localStorage.removeItem("room");
    window.location.reload();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (messages === "") return;

    await addDoc(messageRef, {
      text: messages,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });

    setMessages("");
  }

  return (
    <div className="flex flex-col h-screen bg-green-100 text-gray-800">
      <div ref={chatRef} className="flex-grow overflow-y-auto px-4 py-8">
        {arrmsg.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.user === auth.currentUser.displayName
                ? "flex-row-reverse"
                : "flex-row"
            }`}
          >
            <div
              className={`rounded-lg w-fit px-4 py-2 shadow-md text-sm ${
                msg.user === auth.currentUser.displayName
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="font-semibold text-baf3ed">{msg.user}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center px-4 py-2 bg-white"
      >
        <div className="relative flex-grow mr-2">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Type your message here"
            onChange={(e) => setMessages(e.target.value)}
            value={messages}
            className="w-full px-4 py-2 pr-10 bg-slate-100 text-gray-800 rounded-xl focus:outline-none focus:ring focus:ring-green-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="public/send.png" alt="Send" className="h-6 w-6" />
          </button>
        </div>
        <button
          onClick={handleExit}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          Exit
        </button>
      </form>
    </div>
  );
};

export default Chat;
