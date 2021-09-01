import React from "react";

import socket from './socket';
import JoinBlock from "./componets/JoinBlock";
import reducer from "./reducer";
import Chat from "./componets/Chat";
import axios from "axios";

function App() {

    const [personUserName, setPersonUserName] = React.useState('geg');
    const [state, dispatch] = React.useReducer(reducer, {
        joined: false,
        roomID: null,
        userName: null,
        users: [],
        messages : [],
    });

    const selectUserName = (name) => {
        setPersonUserName(name);
    }

    const onAuth = async (obj) => {
        dispatch({
            type : 'JOINED',
            payload: obj,
        });
        socket.emit('ROOM:JOIN', obj);
        const {data} = await axios.get(`/rooms/${obj.roomId}`);
        setUsers(data.users);
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        });
    }

    const addMessage = (message) => {
        dispatch({
            type : 'NEW_MESSAGE',
            payload : message,
        });
    }

   React.useEffect(() => {
       socket.on('ROOM:SET_USERS' , setUsers);
       socket.on('ROOM:NEW_MESSAGE' , addMessage);
   }, []);

    console.log(personUserName);

    return (
    <div className="App">
        {!state.joined ? <JoinBlock onAuth={onAuth} selectUserName={selectUserName}/>
        : <Chat personUserName={personUserName} {...state} addMessage={addMessage}/>}
    </div>
  );
}

export default App;
