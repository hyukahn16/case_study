import { useTopicContext } from "../contexts/TopicContext";
import { useChatContext } from "../contexts/ChatContext";
import "./TopicButton.css";


function TopicButton() {

    const { messages, setMessages } = useChatContext();
    const { topicSelected, setTopicSelected } = useTopicContext();

    // Help Selection Handler
    const handleTopicSelection = (helpType) => {
        // Set topic selection to true to hide buttons
        setTopicSelected(true);

        // Add user's selection to chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", content: `I need help with ${helpType}.` },
        ]);

        // Simulate assistant's response
        setTimeout(() => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant",
            content: `Great! Let's get started with that.\nHow can I help you regarding ${helpType}?`},
        ]);
        }, 500);
    };

    return (
        <>
        {/* Topic Selection Buttons */}
        {!topicSelected && (
            <div className="topic-buttons-container">
                <button
                    className="topic-button"
                    onClick={() => handleTopicSelection("Refrigerator Parts")}
                >
                Refrigerator Parts
                </button>
                <button
                    className="topic-button"
                    onClick={() => handleTopicSelection("Dishwasher Parts")}
                >
                Dishwasher Parts
                </button>
            </div>
        )}
        </>
    );
}

export default TopicButton;
// Note: The handleTopicSelection function should be defined in the parent component (ChatWindow.js)