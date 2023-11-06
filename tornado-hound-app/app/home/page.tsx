"use client";
import React, { useState } from "react";
import Searchbar from "../Components/Searchbar";
import Link from "next/link";
import { Console } from "console";
import { Todo } from "../Todo";

const App: React.FC = () => {
  const [todo, setTodo] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { zip: todo, lat: 1, long: 1 }]);
      setTodo(todo);
    }
  };

  console.log(todo);
  return (
    <div className="App">
      <title>Tornado Hound</title>
      <img src="/Images/tornado_hound_logo.svg" alt="Logo"></img>
      <span className="heading">Tornado Hound</span>
      <nav>
        <ul>
          <li>
            <a href="/home">Home</a>
            <Link href="../historical-data/">Historical data</Link>
            <Link href="../about/">About</Link>
          </li>
        </ul>
      </nav>
      <h2> Enter zipcode below: {todo}</h2>
      <Searchbar todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
};

export default App;
