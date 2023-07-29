import { useEffect, useState } from "react";
import Formulario from "./assets/components/Formulario";
import Todos from "./assets/components/Todos";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];
//preguntar si localstorage.get item (si es que existe algo) lo transformamos a parse, en caso contrario
//lo inicializamos con un array vacio

const App = () => {
  const [todos, setTodos] = useState(initialStateTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    //guardaremos todo en el almacenamiento local, como tenemos un array usamos json stringify para transformarlo a string
  }, [todos]);
  //con el [] se ejecutara el useEffect cada vez que exista un cambio en los todos (agregar, editar o eliminar)

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  const updateTodo = (id) => {
    const newArray = todos.map((todo) => {
      if (todo.id === id) {
        todo.state = !todo.state;
      }
      return todo;
    });
    setTodos(newArray);
  };

  const orderTodo = (arrayTodos) => {
    return arrayTodos.sort((a, b) => {
      if (a.priority === b.priority) return 0;
      if (a.priority === true) return -1;
      if (a.priority === false) return 1;
    });
  };

  return (
    <div className="container mb-2">
      <h1 className="my-5">Formularios</h1>
      <Formulario addTodo={addTodo} />
      <Todos
        todos={orderTodo(todos)}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      {/* por acá le paso los props, en el todos={todos} */}
    </div>
  );
};

export default App;
