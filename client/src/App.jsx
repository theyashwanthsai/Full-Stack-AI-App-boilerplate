import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      content: "Welcome to GPT! Ask me anything!",
      role: "assistant",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      content: e.target[0].value,
      role: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    e.target.reset();

    try {
      const response = await fetch(process.env.BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage.content }),
      });

      if (!response.ok) {
        throw new Error("There was an error");
      }

      const data = await response.json();

      const assistantMessage = {
        content: data.answer,
        role: "assistant",
      };

      setMessages([...newMessages, assistantMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="container mx-auto p-5 fixed inset-0">
      <div className="mockup-window border bg-base-300 w-full h-full flex flex-col">
        <div className="p-5 pb-8 flex-grow overflow-auto">
          {messages.length &&
            messages.map((msg, i) => {
              return (
                <div
                  className={`chat ${
                    msg.role === "assistant" ? "chat-start" : "chat-end"
                  }`}
                  key={"key" + i}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          msg.role === "assistant" ? "react.svg" : "vite.svg"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">{msg.content}</div>
                </div>
              );
            })}
        </div>

        <form
          className="form-control m-5 items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="input-group max-w-full w-[800px] relative items-end">
            <div className="flex-grow">
              {isTyping && (
                <small className="animate-pulse">GPT is Typing...</small>
              )}

              <textarea
                name="query"
                placeholder="Ask me anything!"
                className="w-full textarea textarea-bordered max-h-64 overflow-y-scroll"
                required
              />
            </div>
            <button className="btn btn-square" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_15_829)">
                  <path
                    d="M19.364 5.05026L3.10051 8.58579L10.8787 13.5355M19.364 5.05026L15.8284 21.3137L10.8787 13.5355M19.364 5.05026L10.8787 13.5355"
                    stroke="#C8CAD0"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15_829">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default App;
