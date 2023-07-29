import Todo from "./Todo";

const Todos = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <div className="mt-5">
      <h2 className="text-center">Todos</h2>
      <ul className="list-group mt-3">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}

        {todos.length === 0 && (
          <li className="list-group-item text-center">Sin todos</li>
        )}
      </ul>
    </div>
  );
};
export default Todos;
