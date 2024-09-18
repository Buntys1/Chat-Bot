import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main/Main';
// import { ContextProvider } from './Context/Context';  // Ensure you are importing the provider
import ContextProvider from './Context/Context';  // Correct default import


const App = () => {
  return (
    <ContextProvider>   {/* Wrap your app in the context provider */}
      <Sidebar />
      <Main />
    </ContextProvider>
  );
};

export default App;

