import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/header";
import { Card } from "./components/card";


const MainApplayout=()=>{
    return(<>
        <Header/>
        <Card/>
</>
    )
}

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(<MainApplayout/>)