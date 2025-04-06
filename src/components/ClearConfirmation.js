import React from "react";
import "./ClearConfirmation.css";

const ClearConfirmation = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null; // Don't render if not visible

  return (
    <>
    {/* Gray Overlay */}
    <div className="modal-overlay"></div>

	{/* Clear Confirmation Screen */}
    <div className="modal-overlay">
		<div className="modal-content">
			<h4>Are you sure you want to clear the chat history?</h4>
			<div className="modal-actions">
				<button className="confirm-button" onClick={onConfirm}>
					Yes
				</button>
				<button className="cancel-button" onClick={onCancel}>
					No
				</button>
			</div>
		</div>
    </div>
    </>
  );
};

export default ClearConfirmation;