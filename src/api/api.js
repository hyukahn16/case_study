export const sendMessage = async (prevMessages, inputText) => {
  	console.log("Sending message to API:", inputText);

	// Send previous messages to give overall context to DeepSeek
	const newMessage = prevMessages.concat([{ role: 'user', content: inputText }]);
	try {
		const response = await fetch('http://localhost:5000/api/chat', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({messages: newMessage})
		});
		
		// Check for HTTP errors first
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
		}

		const data = await response.json();
		console.log('API Response:', data);

		// Validate response structure using optional chaining
		const responseText = data?.choices?.[0]?.message?.content;
		
		if (!responseText) {
			throw new Error('Invalid API response structure');
		}

		return responseText;

	} catch (error) {
		console.error('Request failed:', error);
		return `Error: ${error.message}`;
	}
};

export const sendMessageTest = async(inputText) => {
  	console.log("Sending message to API:", inputText);
  	return "Hello from the chatbot!";
}