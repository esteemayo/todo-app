import { useState, useEffect, useContext, createContext } from "react";

const getLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  if (tasks) return JSON.parse(tasks);
  return [];
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [editID, setEditID] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState(getLocalStorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const addTasks = (task) => {
    const newTask = {
      id: new Date().getTime().toString(),
      name: task,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Name field is required.");
      return;
    } else if (name && isEditing) {
      const updTask = tasks.map((task) =>
        task.id === editID ? { ...task, name } : task
      );

      setName("");
      setEditID(null);
      setTasks(updTask);
      setIsEditing(false);
      showAlert(true, "success", `${name} successfully updated.`);
    } else {
      addTasks(name);
      setName("");
      showAlert(true, "success", `${name} successfully added.`);
    }
  };

  const handleToggleTaskCompleted = (id) => {
    const updTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updTasks);
  };

  const handleDeleteTask = (id) => {
    showAlert(true, "danger", "Task removed successfully.");
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleEditTask = (id) => {
    const specificTask = tasks.find((task) => task.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(specificTask.name);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  return (
    <AppContext.Provider
      value={{
        name,
        tasks,
        alert,
        filter,
        setName,
        setTasks,
        addTasks,
        showAlert,
        isEditing,
        setFilter,
        FILTER_MAP,
        FILTER_NAMES,
        setIsEditing,
        handleSubmit,
        handleEditTask,
        handleDeleteTask,
        handleToggleTaskCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
