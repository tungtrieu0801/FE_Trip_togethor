import MessageInputArea from "../components/input/MessageInputArea";
import MessagePanel from "../components/MessagePanel";
import SlideBar from "../components/SlideBar";

export default function MainChatPage() {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/5 border-2 border-cyan-200"><SlideBar /></div>
            <div className="w-4/5 flex flex-col">
                <div className="flex flex-1 bg-blue-300"><MessagePanel /></div>
                <div className=""><MessageInputArea /></div>
            </div>
        </div>
    )
}