import React from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import ClearButton from "./components/ClearButton";
import { ChatProvider } from "./contexts/ChatContext";
import { TopicProvider } from "./contexts/TopicContext";

export const composeProviders = (...providers) => ({ children }) =>
	providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, children);

const Providers = composeProviders(
  	ChatProvider,
  	TopicProvider
);

function App() {
  return (
    <Providers>
    	<div className="App">
			<div className="heading">
				<ClearButton/>
				PartSelect - Chatbot
			</div>
			<ChatWindow/>
		</div>
    </Providers>
  );
}

export default App;