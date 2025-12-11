import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowCircleUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { BiSolidBot } from "react-icons/bi";
import Markdown from "react-markdown";
import { Form } from "react-bootstrap";
import { RiSendPlaneFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { commonbasePath } from "@/common/constants";
import { axiosStu } from "@/common/axiosPublic";

function Assistant({ closeModel }) {
  // Assistant functionalities
  const [typeindicator, settypeindicator] = useState(false);
  const [botindicator, setbotindicator] = useState(false);
  const [language, setLanguage] = useState("English");
  const [chatMessages, setChatMessages] = useState(() => {
    const stored = sessionStorage.getItem("chatMessages");
    return stored
      ? JSON.parse(stored)
      : [{ response: "Hi.. How can I Assist you" }];
  });

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const textareaRefs = useRef([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [increment, setIncrement] = useState(0);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [ConvoId, setConvoId] = useState("");
  const scrollRef = useRef(null);

  // Add for dynamic userId and prgCode handling
  const [userId, setUserId] = useState("");
  const [prgCode, setPrgCode] = useState("");

  const [username, setUsername] = useState("");
  const [clientname, setClientname] = useState("");
  const [programcode, setProgramcode] = useState("");
  const [bottoken, setbottoken] = useState("");
  const [discoverycollectionId, setdiscoverycollectionId] = useState("");
  const [discoveryprojectId, setdiscoveryprojectnId] = useState("");
  const [systemprompt, setsystemprompt] = useState("");
  const [token, settoken] = useState("");
  const [temp, settemp] = useState();
  const [collectionname, setcollectionname] = useState("");
  const fullResponse = useRef("");
  
  // Add WebSocket ref to manage connection properly
  const wsRef = useRef(null);

  // const handleTextareaResize = () => {
  //   textareaRefs.current.forEach((textarea) => {
  //     if (textarea) {
  //       setTimeout(() => {
  //         textarea.style.height = `${textarea.scrollHeight + 30}px`;
  //       }, 100);
  //     }
  //   });
  // };

  // const handleLanguageChange = (event) => {
  //   const selectedLanguage = event.target.value;
  //   setLanguage(selectedLanguage);
  // };

  useEffect(() => {
    const fetchClientData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const client = queryParams.get("client");
      const agent = queryParams.get("agent");
      fullResponse.current = "";
      
      try {
        const response = await axios.get(
          // `http://106.51.247.170:8080/stu/auth/token/GKCS000/CC-UMGWJCCH8`
                    `http://192.168.10.82:8080/stu/auth/token/GKCS000/CC-UMGWJCCH8`

          
        );
        setProgramcode(response.data[0].programCode);
        setUsername(response.data[0].userId);
        setbottoken(response.data[0].jwt);
        setsystemprompt(response.data[0].systemPrompt);
        setcollectionname(response.data[0].collectionName);
        settoken(response.data[0].maxTokens);
        settemp(response.data[0].temp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientData();
  }, []);

  // Separate WebSocket setup function
  const setupWebSocket = () => {
    // Close existing WebSocket if it exists
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    // Clear any existing session ID for fresh connection
    if (sessionStorage.getItem("sessionId")) {
      sessionStorage.removeItem("sessionId");
    }

    const ws = new WebSocket("ws://106.51.247.170:8080/stu/ws");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connection established successfully");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      
      if (!sessionStorage.getItem("sessionId")) {
        sessionStorage.setItem("sessionId", event.data);
        setSessionId(event.data);
      } else {
        if (data === "--EOT--") {
          // End of transmission - do nothing
          return;
        } else if (data === "--EOL--") {
          setIsGeneratingResponse(false);
          setbotindicator(false);
          return;
        } else {
          setbotindicator(false);
          fullResponse.current += data;
          
          setChatMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (updatedMessages.length === 0) return prevMessages;

            const lastMessage = updatedMessages[updatedMessages.length - 1];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              response: fullResponse.current,
            };
            
            return updatedMessages;
          });
        }
      }
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return ws;
  };

  useEffect(() => {
    const convo = sessionStorage.getItem('convoid');
    
    const fetchConvoId = async () => {
      try {
        console.log(bottoken);

        const res = await axiosStu.get(
          `http://106.51.247.170:8080/stu/convo/create/GKCS000`,
          {
            headers: {
              Authorization: `Bearer ${bottoken}`,
            },
          }
        );
        setConvoId(res.data);
        sessionStorage.setItem("convoid", res.data);
      } catch (error) {
        console.error("Error fetching conversation ID:", error);
      }
    };

    if (bottoken) {
      // Always setup WebSocket when component mounts or bottoken changes
      const ws = setupWebSocket();

      if (!convo) {
        fetchConvoId();
      } else {
        setConvoId(convo);
      }

      // Cleanup function
      return () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
          console.log("WebSocket connection closed on cleanup.");
        }
      };
    }
  }, [bottoken]);

  // Cleanup on component unmount
  useEffect(() => {
    const cleanupWebSocket = () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
        console.log("WebSocket connection closed on cleanup.");
      }
    };

    window.addEventListener("beforeunload", cleanupWebSocket);

    return () => {
      cleanupWebSocket();
      window.removeEventListener("beforeunload", cleanupWebSocket);
    };
  }, []);

  const generateResponse = async () => {
    // Reset fullResponse for new query           
    fullResponse.current = "";
    
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    
    setQuery("");
    setbotindicator(true);
    setResponse("");
    setIsGeneratingResponse(true);
    
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { user: query, response: "" },
    ]);

    const user_query = query;
    const jsonData = JSON.stringify({
      input: query,
      user_id: username,
      language: language,
      bot_details: {
        collection: collectionname,
        system_prompt: systemprompt,
      },
      internet_conn: false,
      convo_id: ConvoId,
      stream: true,
      session_id: sessionStorage.getItem("sessionId"),
      prgCode: programcode,
    });

    console.log("Session ID:", sessionStorage.getItem("sessionId"));

    try {
      await axiosStu.post(
        `http://106.51.247.170:8080/stu/tokStream`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bottoken}`,
          },
        }
      );
      console.log("Request sent:", jsonData);
    } catch (error) {
      console.error("Error sending message:", error);
           setChatMessages((prevMessages) => [
      ...prevMessages,
      {response: "something went wrong try again later!" },
    ]);
      setIsGeneratingResponse(false);
      setbotindicator(false);
    }
  };

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages));
    }
    
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("chatMessages");
      sessionStorage.removeItem('convoid');
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className=" h-[65vh] w-80 md:h-[85vh] md:w-96 lg:h-[85vh] lg:w-96 xl:h-[85vh] xl:w-128 overflow-hidden p-2 ">
      <div className="text-container custom-scrollbar1">
        <div className="bg-primary_color sticky top-0 z-10 rounded-xl">
          <img
            onClick={(e) => {
              closeModel(false);
            }}
            alt='cancel icon'
            className="cursor-pointer z-10 absolute text-blue h-6 w-6 top-4 right-4 bg-black rounded-xl"
            src={`${commonbasePath}/cancel.png`} />
          <div
            className="slider-component"
            style={{
              display: "flex",
              gap: "12px",
              position: "sticky",
              top: 0,
              width: "fit-content",
              zIndex: 1,
              alignItems: "center",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <div className="flex items-center justify-center gap-4" >
              <img
                onClick={(e) => {
                  closeModel(false);
                }}
                alt='bot icon'
                className="h-10"
                src={`${commonbasePath}/bot.png`} />
              <span className="text-white flex justify-center items-center gap-3  text-base ">Introducing
                <img
                  alt='online'
                  className="h-4"
                  src={`${commonbasePath}/stu-white.png`} />
              </span>
            </div>
          </div>
        </div>

        <div className="text-messages">
          {chatMessages.map((chat, index) => (
            <div className="p-2" key={index}>
              <article
                className="mb-3 py-2\.5 px-3"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  background: `${chat.user ? "#e3e3e3" : ""}`,
                  borderRadius: "20px",
                  maxWidth: "80%",
                  width: "fit-content",
                  marginLeft: "auto",
                  position: "relative",
                  padding: "4px 15px",
                }}
              >
                <div className="text-xs" style={{ whiteSpace: "pre-wrap" }}>{chat.user}</div>
              </article>

              <article>
                <div
                  style={{ display: "flex", justifyContent: "start", width: "80%" }}
                >
                  <div>
                    <img
                      src={`${commonbasePath}/stu.png`}
                      loading="lazy"
                      style={{ width: "2rem", marginRight: "15px" }}
                      alt="Stu Logo"
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      padding: "10px 15px",
                      borderRadius: "20px",
                      boxShadow:
                        "0px 0px 2px #cecece, 0px -0px 2px #eeeeee",
                    }}
                  >
                    {botindicator && !chat.response ?
                      <div className="m-3" style={{ height: 'fit-content', width: '100px', display: 'flex' }}>
                        <span style={{ fontSize: '5px' }}></span>
                        <div className="typing-indicator" >
                          <span style={{ opacity: typeindicator ? 1 : 0.5 }}><GoDotFill /></span>
                          <span style={{ opacity: typeindicator ? 1 : 0.5 }}><GoDotFill /></span>
                          <span style={{ opacity: typeindicator ? 1 : 0.5 }}><GoDotFill /></span>
                        </div>
                      </div> :
                      <Markdown className="markdown text-xs whitespace-pre-line overflow-y-hidden overflow-x-auto custom-scrollbar2 text-justify " >{chat.response}</Markdown>}
                  </div>
                </div>
              </article>
            </div>
          ))}
          <div ref={scrollRef}></div>
        </div>
      </div>
      <div
        style={{
          height: "10%",
          display: "flex",
          justifyContent: "center",
          marginTop: "3px",
        }}
      >
        <div className="input-query-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isGeneratingResponse && query.trim()) {
                generateResponse();
              }
            }}
            style={{ display: "flex", width: "100%", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="Ask Me..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => isGeneratingResponse && e.preventDefault()}
              className={`p-2 ${isGeneratingResponse ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <RiSendPlaneFill
              onClick={(!isGeneratingResponse && query.trim()) ? generateResponse : null}
              style={{
                cursor: (!isGeneratingResponse && query.trim()) ? "pointer" : "not-allowed",
                fontSize: "1.5rem",
                color: query.length > 0 ? "#0f75bc" : "black",
                opacity: isGeneratingResponse ? 0.5 : 1,
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Assistant;