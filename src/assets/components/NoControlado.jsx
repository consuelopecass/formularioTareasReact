/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";

const NoControlado = () => {
  //USEREF es un nuevo HOOK - Se usa para hacer referencia a un elemento del DOM Virtual de REACT
  //en este caso, lo usaremos para referenciar los elementos del formulario y poder captarlos
  //lo referenciaremos en la linea 15, ref={form}
  const form = useRef(null);
  const [error, setError] = useState("");

  const handleSubmit = (evento) => {
    //el preventDefault es para evitar que se envíe el formulario en milesimas de segundos
    evento.preventDefault();
    //console.log("me diste click");
    //siempre vendra con el current, es como el protho, revisar el console solo con el form
    console.log(form.current);
    setError("");

    //------- CAPTURAR LOS DATOS ------------
    //con el FormData creamos un nuevo form con los datos que ingresemos al formulario
    const data = new FormData(form.current);
    //para usar FORMDATA ES VITAL usar los name en los inputs del form, ejemplo: title="name"
    console.log([...data.entries()]); //spread operator
    //spread operator -- para recorrer cada uno de los iterables del entries (los datos del formulario) - copia cada uno de sus elementos

    //para pasar la data del form a un objeto
    const { title, description, state } = Object.fromEntries([
      ...data.entries(),
    ]);
    console.log(title, description, state);

    //------- VALIDAR LOS DATOS ------------

    if (title.trim === "") return console.log("Llena este campo vacío"); //trim para limpiar los espacios vacios
    if (!description.trim()) return setError("Llena todos los campos");
    if (state.trim === "") return console.log("Llena este campo vacío");
  };

  return (
    <form onSubmit={handleSubmit} ref={form}>
      <input
        type="text"
        placeholder="Ingrese TODO"
        className="form-control mb-2"
        name="title"
        defaultValue="tarea #01"
      />
      <textarea
        className="form-control mb-2"
        placeholder="Ingrese descripción"
        name="description"
        defaultValue="descripción #01"
      />
      <select
        className="form-select mb-2"
        name="state"
        defaultValue="completado"
      >
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completado</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Procesar
      </button>
      {error !== "" && error}
    </form>
  );
};

export default NoControlado;
