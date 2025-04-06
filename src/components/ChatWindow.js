import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

import "./ChatWindow.css";
import { sendMessage, sendMessageTest } from "../api/api";
import { useChatContext } from "../contexts/ChatContext";
import { useTopicContext } from "../contexts/TopicContext";
import { useVisibleContext } from "../contexts/VisibleContext";
import { useLoadingContext } from "../contexts/LoadingContext";
import LoadingDots from "./LoadingDots";
import TopicButton from "./TopicButton";
import UserInputArea from "./UserInputArea";

function ChatWindow() {

	const { messages, setMessages, defaultMessage } = useChatContext();
	const { topicSelected, setTopicSelected } = useTopicContext();
	const { visibility, setVisibility } = useVisibleContext();
	const { loading, setLoading } = useLoadingContext();
	// const [ input, setInput ] = useState("");

	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  	};
  	useEffect(() => {
      	scrollToBottom();
  	}, [messages]);

  return (
	<div className="messages-container">
	{/* Render messages in the chat*/}
		{messages.map((message, index) => (
			<div 
				key={index} 
				className={`${message.role}-message-container`}
			>
				{message.content && (
					<div className={`message ${message.role}-message`}>
						{/* Safely render markdown */}
						<ReactMarkdown>{message.content}</ReactMarkdown>
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
	{/* Topic Selection Button */}
	<TopicButton />

	<div ref={messagesEndRef} />
      
    {/* User Input area */}
	{!visibility && <UserInputArea/>}

    </div>
  );
}

export default ChatWindow;
