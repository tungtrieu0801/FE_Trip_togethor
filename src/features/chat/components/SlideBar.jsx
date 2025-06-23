import { useEffect, useState } from "react";
import socket from "../../../configs/socketConnect";
import Search from "antd/es/input/Search";
import axiosClientChat from "../../../configs/ChatAxiosConfig";

export default function SlideBar() {

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const listRooms = async () => {
            try {
                const res = await axiosClientChat.get("room/getListRoom");
                console.log(res);
                setRooms(res.data.data || []);
            } catch (error) {
                setRooms([])
            }
        };
        listRooms();
    }, []);

    const handleSearch = async () => {
        if (!input.trim()) return;
        try {
            const res = await fetch(`http://localhost:3000/user/searchUserByPhone?input=${encodeURIComponent(input)}`);
            const data = await res.json();
            setResult(data.data || null);
            console.log(data.data);
        } catch (error) {
            setResult([]);
        }
    }

    const joinRoom = (roomId) => {
        console.log("Joining room:", roomId);
        socket.emit('joinRoom', roomId);
    }

    return (
        <div className="slide-bar">
            <div>
                <Search
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onSearch={handleSearch}
                    placeholder="Nhập số điện thoại"
                    allowClear
                    enterButton
                    style={{ width: 200 }}
                />
            </div>
           
            <div>
                {result && (
                    <div
                        style={{ cursor: "pointer", padding: "4px 0" }}
                        onClick={() => joinRoom(result.roomSingleId)}>
                        {result.phoneNumber} - {result.username}
                    </div>
                )}
            </div>
            <div>
                {rooms.map(room => (
                    <div
                        key={room._id}
                        className="cursor-pointer py-1 bg-yellow-200"
                        onClick={() => joinRoom(room.roomSingleId)}
                    >
                        {room._id}
                    </div>
                ))}
                <div>pk</div>
            </div>
        </div>
    );
}