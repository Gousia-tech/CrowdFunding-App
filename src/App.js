import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routing from "./Components/Route";



function App() {
  return (
 
      <Router>  {/* Wrap Routing in Router */}
        <Routing />
      </Router>
   
  );
}

export default App;
