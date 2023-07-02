import React,{useState,useEffect} from "react";
import {BrowserRouter as Router, useLocation,} from 'react-router-dom'
import GetRoutes from "./GetRoutes/GetRoutes";
import {Provider} from 'react-redux'
import store from "./Redux/store";

function App() {

  return (

 <div>
   <Router>
     <Provider store={store}>
         <GetRoutes/>
     </Provider>
   </Router>
 </div>
  );
}

export default App;
