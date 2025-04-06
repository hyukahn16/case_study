export const sendMessage = async (inputText) => {
  console.log("Sending message to API:", inputText);

  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: inputText }]
      })
    });
    
    // Check for HTTP errors first
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
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