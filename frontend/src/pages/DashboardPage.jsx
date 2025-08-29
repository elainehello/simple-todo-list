import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import { API_BASE_URL } from "../services/api";
import TaskItem from "../components/TaskItem"; // Make sure this import exists

export default function DashboardPage() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = () => {
    axios.get(`${API_BASE_URL}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(() => setError("Failed to fetch tasks"));
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [token]);

  // Handle form input
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit (create)
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE_URL}/tasks/`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // Handle task delete
  const handleDelete = async id => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  // Add this update handler:
  const handleUpdate = async (id, updatedTask) => {
    setLoading(true);
    setError("");
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded flex-1"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loading={loading}
          />
        ))}
      </ul>
    </div>
  );
}