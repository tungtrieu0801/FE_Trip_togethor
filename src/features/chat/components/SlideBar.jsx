import { useState } from "react";
import socket from "../../../configs/socketConnect";
import Search from "antd/es/input/Search";

export default function SlideBar() {

    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

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
                <Search placeholder="Nhập số điện thoại" allowClear enterButton style={{ width: 200 }} />
            </div>
            <h2>Slide bar</h2>
            <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Nhập sđt"
                style={{ marginRight: 8 }} 
            />
            <button onClick={handleSearch}>Tìm kiếm</button>
            <div>
                {result && (
                    <div
                        style={{ cursor: "pointer", padding: "4px 0"}}
                        onClick={() => joinRoom(result.roomSingleId)}>
                            {result.phoneNumber} - {result.username}
                        </div>
                )}
            </div>
        </div>
    );
}