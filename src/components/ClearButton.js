import React, { useState } from "react";
import ClearConfirmation from "./ClearConfirmation";
import { useChatContext } from "../contexts/ChatContext";
import { useTopicContext } from "../contexts/TopicContext";
import { useVisibleContext } from "../contexts/VisibleContext";
import "./ClearButton.css";

function ClearButton() {

	const { messages, setMessages, defaultMessage } = useChatContext();
	const { topicSelected, setTopicSelected } = useTopicContext();
	const { visibility, setVisibility } = useVisibleContext();

	const handleClearHistory = () => {
		setMessages(defaultMessage); // Clear existing messages
		setTopicSelected(false); // Show topic selection buttons again
		setVisibility(false); // Close gray screen
	};

	const handleCancel = () => {
		setVisibility(false); // Close gray screen
	};

	return (
		<>
			{/* Clear History Button */}
			<button
				className="clear-history-button"
				onClick={() => setVisibility(true)}
			>
				Clear History
			</button>


			{/* Confirmation Screen */}
			<ClearConfirmation
				isVisible={visibility}
				onConfirm={handleClearHistory}
				onCancel={handleCancel}
			/>
		</>
	);
}

export default ClearButton;