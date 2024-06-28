import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/header";
import { Card } from "./components/card";


const MainApplayout=()=>{
    return(<>
      <Header/>
        <div className="center">  <Card/></div>
</>
    )
}

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(<MainApplayout/>)