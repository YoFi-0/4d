import { use, useEffect, useRef, useState } from "react";
import { n8n_client } from "../functions/n8nClient";

export function AiChat() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<
        { from: "user" | "bot"; text: string; loading?: boolean }[]
    >([]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const thinking = ["ثواني بس", " خلك معي", "لحظه بس"];
    const [dotThinking, setDotThinking] = useState("...");
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDotThinking((prev) => {
                switch (prev) {
                    case "...":
                        return ".";
                    case ".":
                        return "..";
                    case "..":
                        return "...";
                    default:
                        return "...";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);
    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
        setInput("");
        
        // Add AI typing message
        setMessages((prev) => [
            ...prev,
            { from: "bot", text: `${thinking}${dotThinking}`, loading: true },
        ]);

        const botResponse = await n8n_client.SendMsg(userMsg);

        const botText =
            typeof botResponse === "object"
                ? "نشكرك على إختيار فوردزاين راح نتواصل معاك في اقرب وقت إن شاء الله"
                : String(botResponse);

        // Replace the "AI is typing..." message
        setMessages((prev) => [
            ...prev.slice(0, -1), // Remove loading message
            { from: "bot", text: botText },
        ]);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div className="ai-chat-container">
            <div className="chat-toggle-button" onClick={() => setOpen(!open)}>
                🤖
            </div>

            {open && (
                <div className="chat-box">
                    <div className="chat-header">عميل فوردزاين</div>
                    <div className="chat-messages" style={{ overflowY: "auto", maxHeight: "300px" }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.from}`}>
                                <div className="bubble">
                                    {msg.loading ? (
                                        <i>{`${msg.text.split(".")[0]}${dotThinking}`}</i>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="أكتب وش تحتاج؟ ..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button onClick={sendMessage}>📩</button>
                    </div>
                </div>
            )}
        </div>
    );
}
