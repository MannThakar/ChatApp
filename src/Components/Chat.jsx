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
import EmojiPicker from "emoji-picker-react";
import { Smiley, Exit, Mic } from "../icons";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const Chat = ({ room }) => {
  const [messages, setMessages] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messageRef = collection(db, "messages");
  const [arrmsg, setArrmsg] = useState([]);
  const chatRef = useRef(null);

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

  const handleEmojiClick = (emojiObject) => {
    console.log(emojiObject.emoji, 90);
    setMessages((prevMessages) => prevMessages + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div className="flex flex-col h-screen bg-green-100 text-gray-800">
      <nav className="h-14 bg-white opacity-90 flex justify-between items-center px-4">
        <span className="font-semibold text-[#2D2D2D]">{room}</span>
        <button onClick={handleExit} className="focus:outline-none">
          <Exit className="h-6 w-6 text-gray-800" />
        </button>
      </nav>
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
              className={`rounded-lg max-w-96 break-words w-fit px-4 py-2 shadow-md text-sm ${
                msg.user === auth.currentUser.displayName
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div className="flex items-center">
                <p className="font-semibold text-baf3ed">{msg.user}</p>
              </div>
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
            className="w-full px-4 py-2 pl-10 pr-10 bg-slate-100 text-gray-800 rounded-xl focus:outline-none focus:ring focus:ring-green-500"
          />
          <Smiley
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-6 w-6 cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div className="absolute left-0 bottom-full mb-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
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
            {/* <Mic className="h-6 text-gray-700 hover:bg-gray-200 hover:rounded-full" /> */}
            {/* <Mic
              className="h-6 text-gray-700 hover:bg-gray-200 hover:rounded-full cursor-pointer"
            /> */}
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
            />
            <button onClick={recorderControls.stopRecording}>Stop recording</button>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
