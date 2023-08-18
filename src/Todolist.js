// install es7react/redux/Graphql snippets for boiler code
import React from 'react'
import Todo from './Todo'
//we enclose javascript code with{} to diffentiate it from html code
//every todo component in a list of components should
//have a key so that react is able to re-render
//the only components that changed
export default function Todolist({todos,toggleTodo}) {
  return (
        todos.map(todo=>{
            return <Todo toggleTodo={toggleTodo} key={todo.id} todo={todo}/>
        })
   
  )
}
