import { useState } from "react";

export default function TaskItem({ task, onDelete, onEdit, onUpdate, loading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm({ title: task.title, description: task.description || "" });
    onEdit && onEdit(task);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(task.id, editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ title: task.title, description: task.description || "" });
  };

  return (
    <li className="mb-2 flex items-center">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex flex-1 gap-2">
          <input
            name="title"
            value={editForm.title}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            name="description"
            value={editForm.description}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-2 py-1 rounded"
            disabled={loading}
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-2 py-1 rounded"
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="font-semibold">{task.title}</span>
          {task.description && (
            <span className="ml-2 text-gray-600">- {task.description}</span>
          )}
          <button
            onClick={handleEditClick}
            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded"
            disabled={loading}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            disabled={loading}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}