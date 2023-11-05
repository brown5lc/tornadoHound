"use client"
import React, { useState } from "react";
import Searchbar from "./Components/Searchbar";
import Link from 'next/link';
import { Console } from "console";
import { Todo } from "./Todo";


const App: React.FC = () => {
  const [todo, setTodo] = useState(0)
  const [todos, setTodos] = useState<Todo[]>([])
  const handleAdd = (e: React.FormEvent) => {e.preventDefault();
  
    if (todo){
    setTodos([...todos, {zip: todo, lat:1, long: 1}])
    setTodo(todo);
    }
  };

console.log(todo)
  return(
    <div className="App">
      <title>Tornado Hound</title>
      <img src="logo.png" alt="Logo"></img>
      <span className="heading">Tornado Hound</span>
      <nav>
      <ul>
        <li><a href="#">Home</a></li>   
        <li><a href="Historical">Historical data</a></li>
        <li><a href="About">About</a></li>
      </ul>
    </nav>
    <h2> Enter Zipcode Below </h2>
      <Searchbar todo={todo}setTodo={setTodo} handleAdd={handleAdd} />

    </div>    
  );
};

export default App;