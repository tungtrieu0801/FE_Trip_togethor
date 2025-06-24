import { Button, Input } from "antd";
import { useState, useRef, useLayoutEffect } from "react";
import socket from "../../../../configs/socketConnect";
import ListOptionSend from "./ListOptionSend";
import { BsMic } from "react-icons/bs";
import {
    SmileOutlined
} from '@ant-design/icons';
import { roomState } from "../../../../state/room.state";
export default function MessageInputArea() {
    const [message, setMessage] = useState('');
    const [height, setHeight] = useState(32);
    const textareaRef = useRef(null);
    const receiverId = roomState(state => state.receiverId);

    const handleSend = () => {
        const msg = {
            message: message,
            roomType: 1,
            receivedId: receiverId
        }
        socket.emit("message", msg);
        setMessage('');
    };

    const handleKeyEnter = (e) => {
        if (e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    useLayoutEffect(() => {
        if (textareaRef.current) {
            setHeight(textareaRef.current.resizableTextArea.textArea.scrollHeight);
        }
    }, [message]);

    return (
        <div className="message-input-area p-4 h-full flex flex-col justify-end">
            <div className="flex items-center  gap-2.5">
                <ListOptionSend />
                <div className="w-full relative flex-1">
                    <Input.TextArea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        autoSize={{ minRows: 1.2, maxRows: 6 }}
                        onPressEnter={handleKeyEnter}
                        className="resize-none pr-10"
                    />
                    <div className="flex items-center absolute bottom-2 right-3 gap-2em ">
                        <BsMic className=""/>
                        <SmileOutlined
                            onClick={handleSend}
                            className=" text-xl text-blue-500 cursor-pointer hover:text-blue-700" />
                    </div>

                </div>
            </div>
        </div>
    );
}