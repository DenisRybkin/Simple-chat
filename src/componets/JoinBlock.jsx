import React from "react";
import axios from "axios";

const JoinBlock = ({onAuth, selectUserName}) => {

    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);


    const onLogin = async () => {
        try{
            if(!roomId || !userName){
                return alert("Вы не ввели данные!");
            }
            setIsLoading(true);
            selectUserName(userName);
            const obj = {
                roomId,
                userName,
            };
            await axios.post('/rooms' ,obj);
            onAuth(obj);
        } catch (error) {
            alert('Ошибка при соединение к серверу');
        }
    };

    console.log(selectUserName);

    return (
        <div className="login">
            <div className="outer">
                <div className="middle">
                    <div className="inner">
                        <div className="login-wr">
                            <h2>Вход</h2>
                        </div>
                        <div className="form">
                            <div>
                                <input className="IDRoom" type="text"
                                    placeholder="ROOM ID" value={roomId}
                                    onChange={(event) => setRoomId(event.target.value)}
                                />
                            </div>
                            <input className="userName" type="text"
                                placeholder="Ваше имя" value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                            <button className={isLoading ? "btnLogin disabled" : "btnLogin"} onClick={onLogin} >
                                {isLoading ? 'Вход...' : 'Войти' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinBlock;