import React from 'react';
import socket from "../socket";

const Chat = ({users, messages, userName, roomId, addMessage,personUserName}) => {

    const messagesRef = React.useRef(null);

    const [messageValue, setMessageValue] = React.useState('');

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text : messageValue,
        });
        addMessage({
            userName,
            text: messageValue,
        });
        setMessageValue('');
    }

    React.useEffect(() => {
        messagesRef.current.scrollTo(0,99999);
    }, [messages]);

    console.log("hahaha", personUserName, messages);

    return (
        <div className="chat">
            <div className="chat-users">
                <p style={{fontWeight:500}} >Комната: <b>{roomId}</b></p>
                <hr/>
                <b>Онлайн ({users.length})</b>
                <ul>
                    {users.map((name,index) => <li key={name+index}>{name}</li>)}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    <div className="messages-container">
                        {messages.map((item,index) =>
                            <div key={item+index}
                                 className={item.userName===personUserName ?"message right":"message"}>
                                <p className={item.userName===personUserName ?"right-p":'left-p'}>{item.text}</p>
                                <div>
                                    {item.userName!==personUserName && <span>{item.userName}</span>}
                                </div>
                            </div>)}
                    </div>

                </div>
                <form className="send-massage">
                      <textarea resize="none" placeholder="Напишите сообщение!"
                      onChange={(event => setMessageValue(event.target.value))}
                      value={messageValue} className="form-control" rows="3">

                      </textarea>
                    <button type="button" className="btn btn-primary" onClick={onSendMessage}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;