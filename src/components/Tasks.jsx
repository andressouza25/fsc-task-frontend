import { useState } from "react";
import Header from "./Header";

function Tasks(){
 const [inputValue, setInputValue]    = useState('teste');
 const [messages,setMessages]= useState([
    'Hello world',
    'FSC is the best course in the world'
 ])
 function handleButtonClick(){
    setMessages([...messages, inputValue])
 }

 return(
    <div>
        <Header>
            <h1>Add a Task</h1>
        </Header>
    </div>
 )

}

export default Tasks()