import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (newTitle.trim()) {
      onEdit(task.id, newTitle);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      className="task-item d-flex justify-content-between align-items-center p-2 border rounded bg-dark text-light m-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <div className="d-flex align-items-center gap-2">
        <input
          type="checkbox"
          role="button"
          className="form-check-input"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {isEditing ? (
          <motion.input
            type="text"
            className="form-control form-control-sm bg-secondary text-light"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave}
            autoFocus
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          />
        ) : (
          <motion.span
            className={`task-title ${
              task.completed ? "text-decoration-line-through" : ""
            }`}
            onDoubleClick={() => setIsEditing(true)}
            whileHover={{ scale: 1.1 }}
          >
            {task.title}
          </motion.span>
        )}
      </div>

      <div className="btn-group">
        <motion.button
          className="btn btn-sm btn-outline-light m-1"
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.1 }}
        >
          <FaEdit />
        </motion.button>
        <motion.button
          className="btn btn-sm btn-outline-danger m-1"
          onClick={() => onDelete(task.id)}
          whileHover={{ scale: 1.1 }}
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
