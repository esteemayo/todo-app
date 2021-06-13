import { useEffect, useRef } from "react";

import { useGlobalContext } from "../utils/context";

const TodoForm = () => {
  const { name, setName, isEditing, handleSubmit } = useGlobalContext();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        name="text"
        id="new-todo-input"
        className="input input__lg"
        autoComplete="off"
        value={name}
        ref={inputRef}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
