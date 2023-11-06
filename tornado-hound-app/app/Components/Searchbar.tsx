"use client"
import React from "react";
import "./styles.css";

interface props{
  todo:number;
  setTodo: React.Dispatch<React.SetStateAction<number>>;
  handleAdd:(e: React.FormEvent)=>void;
}

const Searchbar = ({todo, setTodo, handleAdd}: props) => {
  return(
  <form className='input' onSubmit={handleAdd}>
      <input type='input' 
      value = {todo}
      onChange={(e) => setTodo(parseInt(e.target.value, 10))}
    placeholder="Enter Zip Code" className='input__box'/>
    <button className='input_submit' type='submit'>
      Go
    </button>
  </form>)
}

export default Searchbar;

