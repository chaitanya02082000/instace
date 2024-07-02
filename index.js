import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/header";
import {Cardcon} from "./components/card";


const MainApplayout=()=>{
    return(<>
      <Header/>
        <div className="center"> <Cardcon/></div>

  {/* <div className="center">  <Cardcon/></div> */}
</>
    )
}

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(<MainApplayout/>)