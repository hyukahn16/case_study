import React from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import ClearButton from "./components/ClearButton";
import GlobalOverlay from "./components/GlobalOverlay";
import { ChatProvider } from "./contexts/ChatContext";
import { TopicProvider } from "./contexts/TopicContext";
import { VisibleProvider } from "./contexts/VisibleContext";
import { LoadingProvider } from "./contexts/LoadingContext";

export const composeProviders = (...providers) => ({ children }) =>
	providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, children);

const Providers = composeProviders(
  	ChatProvider,
  	TopicProvider,
	VisibleProvider,
	LoadingProvider
);

function App() {
	return (
		<Providers>
			<div className="App">
				<div className="heading">
					<ClearButton/>
					<div className="title">PartSelect - Chatbot</div>
				</div>
				<ChatWindow/>
			</div>
		</Providers>
	);
}

export default App;