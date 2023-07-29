import Swal from "sweetalert2";
import { useState } from "react";

const Formulario = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: "Todo #01",
    description: "Descripción #01",
    state: "pendiente",
    priority: true,
  });

  const { title, description, state, priority } = todo;

  const handleSubmit = (evento) => {
    //el preventDefault es para evitar que se envíe el formulario en milesimas de segundos
    evento.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Título y descripción obligatorios",
      });
    }

    addTodo({
      id: Date.now(),
      ...todo, //copia del todo que se esta agregando
      state: state === "completado" ? true : false,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Todo agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    //console.log(title, description, state);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);

    const { name, type, checked, value } = e.target;

    setTodo({
      ...todo,
      //para usar name todos los inputs deben tener name
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingrese TODO"
        className="form-control mb-2"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Ingrese descripción"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="priority"
          className="form-check-input"
          id="inputCheck"
          checked={priority}
          onChange={handleChange}
        />
        <label htmlFor="inputCheck">Dar prioridad</label>
      </div>

      <select
        className="form-select mb-2"
        name="state"
        value={state}
        onChange={handleChange}
      >
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completado</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Agregar todo
      </button>
    </form>
  );
};

export default Formulario;
