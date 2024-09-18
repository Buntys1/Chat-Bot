import React, { createContext, useState } from 'react';
import { run } from '../Config/gemini';

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPromot, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    const currentPrompt = prompt || input;
    if (!currentPrompt) return;
    
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setPrevPrompt((prev) => [...prev, currentPrompt]); // Store the prompt
    setRecentPrompt(currentPrompt);

    const response = await run(currentPrompt);
    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPromot,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <context.Provider value={contextValue}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider;
