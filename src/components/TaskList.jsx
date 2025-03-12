import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const TaskList = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <motion.div
      className="container mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control m-1"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <motion.button
          className="btn btn-success m-1"
          onClick={addTask}
          whileHover={{ scale: 1.1 }}
        >
          <FaPlus />
        </motion.button>
      </div>

      <div className="btn-group w-100 mb-3">
        <motion.button
          className={`btn m-1 ${
            filter === "all" ? "btn-primary" : "btn-outline-light"
          }`}
          onClick={() => setFilter("all")}
          whileHover={{ scale: 1.1 }}
        >
          All
        </motion.button>
        <motion.button
          className={`btn m-1 ${
            filter === "completed" ? "btn-success" : "btn-outline-light"
          }`}
          onClick={() => setFilter("completed")}
          whileHover={{ scale: 1.1 }}
        >
          Completed
        </motion.button>
        <motion.button
          className={`btn m-1 ${
            filter === "uncompleted" ? "btn-warning" : "btn-outline-light"
          }`}
          onClick={() => setFilter("uncompleted")}
          whileHover={{ scale: 1.1 }}
        >
          Uncompleted
        </motion.button>
      </div>

      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <ul className="list-group">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        ) : (
          <motion.p
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No tasks found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
