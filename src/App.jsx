import { useRef, useState } from "react";
import Signup from "./Pages/Signup";
import Cookies from "universal-cookie";
import Chat from "./Components/Chat";

function App() {
  const cookies = new Cookies();
  const [auth, setAuth] = useState(cookies.get('token'));
  const [room, setRoom] = useState(null);
  const user = useRef(null);
  const localStorageRoom = localStorage.getItem("room");

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    localStorage.setItem("room", user.current.value);
    setRoom(user.current.value);
  };

  if (!auth) {
    return (
      <>
        <Signup setAuth={setAuth} />
      </>
    );
  }

  return (
    <>
      {localStorageRoom ? (
        <Chat room={room} />
      ) : (
        <div>
          <h1>Create a Room</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="room">Room Name</label>
            <input type="text" name="room" id="room" ref={user} />
            <button type="submit">Create Room</button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
