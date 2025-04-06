import React, { useState, useEffect, useRef } from "react";
import { sendMessage, sendMessageTest } from "../api/api";
import { useChatContext } from "../contexts/ChatContext";
import { useTopicContext } from "../contexts/TopicContext";
import { useVisibleContext } from "../contexts/VisibleContext";
import { useLoadingContext } from "../contexts/LoadingContext";

function UserInputArea() {

    const { messages, setMessages, defaultMessage } = useChatContext();
    const { topicSelected, setTopicSelected } = useTopicContext();
    const { visibility, setVisibility } = useVisibleContext();
    const { loading, setLoading } = useLoadingContext();
    const [ input, setInput ] = useState("");

    const handleSend = async (input) => {
        if (typeof input === 'string' && input.trim() !== "") {
            // Set states
            setMessages(prevMessages => 
                [...prevMessages, { role: "user", content: input }]);
            setInput("");
            setLoading(true);
            setTopicSelected(true); // Hide topic selection buttons
            
            try {
                // Call DeepSeek API through backend-server\
                const newMessage = await sendMessage(messages, input);
                // Ensure the returned message has the correct structure
                if (newMessage) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { role: "assistant", content: newMessage },
                    ]);
                } else {
                    // Handle unexpected API response
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { role: "assistant", 
                        content: "Sorry, I couldn't process that. Please try again." },
                    ]);
                }
            }
            catch (error) {
                console.error("Error sending message:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { role: "assistant", 
                    content: "Something went wrong. Please try again." },
                ]);
            } 
            finally {
                setLoading(false); // Hide the "Responding..." bubble
            }
        }
    };


    return (
        <div className="input-area">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                    handleSend(input);
                    e.preventDefault();
                    }
                }}
                rows="1"
                style={{
                    resize: "none",
                    overflow: "hidden",
                    minHeight: "40px",
                    maxHeight: "100px",
                    flexGrow: 1,
                }}
            />
            <button className="send-button" 
                    onClick={() => handleSend(input)}>
            Send
            </button>
        </div>
    );
}

export default UserInputArea;