import React, { useState } from "react";
import ClearConfirmation from "./ClearConfirmation";
import { useChatContext } from "../contexts/ChatContext";
import "./ClearButton.css";

function ClearButton() {
	const { messages, setMessages, defaultMessage } = useChatContext();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleClearHistory = () => {
		setMessages(defaultMessage); // Reset messages
		setIsModalVisible(false); // Close modal
	};

	const handleCancel = () => {
		setIsModalVisible(false); // Close modal without clearing
	};

	return (
		<>
			{/* Clear History Button */}
			<button
				className="clear-history-button"
				onClick={() => setIsModalVisible(true)}
			>
				Clear History
			</button>

			{/* Gray Overlay */}
			{isModalVisible && <div className="modal-overlay"></div>}

			{/* Confirmation Screen */}
			<ClearConfirmation
				isVisible={isModalVisible}
				onConfirm={handleClearHistory}
				onCancel={handleCancel}
			/>
		</>
	);
}

export default ClearButton;