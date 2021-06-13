import { useEffect } from "react";

const Alert = ({ msg, type, tasks, hideAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [tasks, hideAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
