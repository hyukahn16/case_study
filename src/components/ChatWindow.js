import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { sendMessage, sendMessageTest } from "../api/api";
import { marked } from "marked";
import { useChatContext } from "../contexts/ChatContext";
import { useTopicContext } from "../contexts/TopicContext";
import LoadingDots from "./LoadingDots";
import TopicButton from "./TopicButton";

function ChatWindow() {

	const { messages, setMessages, defaultMessage } = useChatContext();
	const { topicSelected, setTopicSelected } = useTopicContext();
	const [ input, setInput ] = useState("");
	const [ loading, setLoading ] = useState(false);

	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  	};
  	useEffect(() => {
      	scrollToBottom();
  	}, [messages]);

  	const handleSend = async (input) => {
		if (typeof input === 'string' && input.trim() !== "") {
			// Set states
			setMessages(prevMessages => 
				[...prevMessages, { role: "user", content: input }]);
			setInput("");
			setLoading(true);
			setTopicSelected(true); // Hide topic selection buttons

			try {
				// Call DeepSeek API through backend-server
				const newMessage = await sendMessage(input);
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
					content: "Sorry, I couldn't process that." },
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
	<div className="messages-container">
	{/* Render messages */}
	{messages.map((message, index) => (
		<div key={index} className={`${message.role}-message-container`}>
		{message.content && (
			<div className={`message ${message.role}-message`}>
			{/* Render Markdown safely */}
			<div
				dangerouslySetInnerHTML={{
				__html: marked(message.content).replace(/<p>|<\/p>/g, ""),
				}}
			></div>
			</div>
		)}
		</div>
	))}
	{/* Show Responding Bubble */}
	{loading && (
		<div className="assistant-message-container">
		<div className="loading assistant-message">
			{/* Responding... */}
			<LoadingDots />
		</div>
		</div>
	)}
	<div ref={messagesEndRef} />

	{/* Topic Selection Button */}
	<TopicButton />
      
      {/* User Input area */}
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
    </div>
  );
}

export default ChatWindow;
