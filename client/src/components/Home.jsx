import { useState } from "react";

function Home() {
    const [Prompt, setPrompt] = useState("");
    const [ans, setAnswer] = useState("");
    const getChat = async () => {
        try {
       
            const postResponse = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: Prompt 
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
    
            if (!postResponse.ok) {
                throw new Error('Error sending prompt.');
            }

    
            const data = await postResponse.json();
            console.log(data);
            setAnswer(data.answer);


        } catch (error) {
            console.error('Error fetching chat:', error);
        }
    }
    

    return (
        <div>
            <h1>Home</h1>
            <input type="text" name="" id="" placeholder="Enter Prompt" onChange={
                (e) => {
                    setPrompt(e.target.value);
                }
            }/>
            <br />
                <br />
                <br />
                {/* <p>Wait for 5 seconds before.We are working!!!</p> */}
                <br />
                <br />
                <button onClick={getChat}>CLick to get answer</button>
                <br />
                <br />
                <br />
                <p>{ans}</p>
        </div>
        
    )
}

export default Home;