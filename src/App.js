import Todolist from "./Todolist";
import { useState, useRef,useEffect} from "react";
const { v4: uuidv4 } = require('uuid');
// app component-->root of our entire app
//jsx allows one to embed components to others
//return is only supposed to return a single value
//to return >=two elements we wrap them inside an empty element
//(fragment <> </>)to trick we're returning a single element
//state-->react object used to contain data/informatatio about
//component.Once a state changes,react re-renders the component
//with that state.use state hook (useState enables us to do so)
// we pass props to components just like we pass attributes to html
//elements.we assign value of prop as enclosed in {}
//useref hook enables use reference other elements 
//.current-->whatever el we are curr referencing
//setTodos-->for manipulating todos
//npm i uuid to install library for generating random ids
//use effect to persist changes upon page re-load
const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos,setTodos] = useState([])
  const todonameRef = useRef()
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem
      (LOCAL_STORAGE_KEY))
    if(storedTodos)setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  },[])
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo=>todo.id==id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  function handleAddTodo(e){
      const name = todonameRef.current.value
      if (name==='')return
      setTodos(prevTodos=>{
        return [...prevTodos,{id:uuidv4(),todoname:name,complete:false}]
      })
      todonameRef.current.value = null

      
  }
  function handleClearTodos(){
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }
  return (
   <>
   <Todolist todos={todos} toggleTodo={toggleTodo}/>
   <input ref = {todonameRef} type="text"/>
   <button onClick={handleAddTodo}>Add Todo</button>
   <button onClick={handleClearTodos}>Clear completed</button>
   <div>{todos.filter(todo=>!todo.complete).length} left to do</div>
   
   </>

  )
}


export default App;
