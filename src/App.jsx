import { useRef, useState } from "react";
import Signup from "./Pages/Signup";
import Cookies from "universal-cookie";
import Chat from "./Components/Chat";

function App() {
  const cookies = new Cookies();
  const [auth, setAuth] = useState(cookies.get("token"));
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
        // <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center min-h-screen">
        //   <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        //     <h1 className="text-4xl font-bold mb-8 text-gray-800">
        //       Create a Room
        //     </h1>
        //     <form onSubmit={handleFormSubmit} className="space-y-6">
        //       <div>
        //         <label
        //           htmlFor="room"
        //           className="block text-lg font-medium text-gray-700 mb-2"
        //         >
        //           Room Name
        //         </label>
        //         <input
        //           type="text"
        //           name="room"
        //           id="room"
        //           ref={user}
        //           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        //           required
        //         />
        //       </div>
        //       <button
        //         type="submit"
        //         className="w-full px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
        //       >
        //         Create Room
        //       </button>
        //     </form>
        //   </div>
        // </div>
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-green-100">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-full max-w-md">
            <h1 className="text-5xl font-bold mb-8 text-gray-800">Vibe Talk</h1>
            <img
              src="public/message.svg"
              alt="Message Logo"
              className="h-40 mx-auto mb-4"
            />
            <h2 className="text-3xl font-semibold mb-8 text-gray-700">
              Create a Room
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="room"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Room Name
                </label>
                <input
                  type="text"
                  name="room"
                  id="room"
                  ref={user}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
