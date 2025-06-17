import { useEffect, useState } from "react";
import socket from "../../../configs/socketConnect";

export default function MessagePanel() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, []);

    return (
        <div className="message-panel">
            <h2>Message Panel</h2>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <p>{msg.data} from {msg.from}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}