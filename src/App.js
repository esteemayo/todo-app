import FilterButton from "./components/FilterButton";
import { useGlobalContext } from "./utils/context";
import TodoForm from "./components/TodoForm";
import Alert from "./components/Alert";
import Todo from "./components/Todo";

import "./App.css";

function App() {
  const { tasks, alert, filter, showAlert, FILTER_MAP, FILTER_NAMES } =
    useGlobalContext();

  const tasksNoun = tasks.length > 1 ? "tasks" : "task";
  const headingText = `${tasks.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>
      {alert.show && <Alert {...alert} tasks={tasks} hideAlert={showAlert} />}
      <TodoForm />
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map((name) => {
          return (
            <FilterButton key={name} name={name} isPressed={name === filter} />
          );
        })}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.filter(FILTER_MAP[filter]).map((task) => {
          return <Todo {...task} key={task.id} />;
        })}
      </ul>
    </div>
  );
}

export default App;
