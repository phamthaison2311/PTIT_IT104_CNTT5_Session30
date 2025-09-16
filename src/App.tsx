import { useEffect, useState } from "react";
import InputTask from "./components/InuputTask";
import Tasks from "./components/Tasks";
import DeleteTask from "./components/DeleteTask";
import axios from "axios";
import { Spinner } from "react-bootstrap";

interface Task {
  id: number;
  name_task: string;
  status: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Lỗi không thể tải dữ liệu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggle = async (id: number, checked: boolean) => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:3000/tasks/${id}`, {
        status: checked,
      });
      await loadTasks();
    } finally {
      setLoading(false);
    }
  };

  const askDelete = (task: Task) => {
    setSelected(task);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:3000/tasks/${selected.id}`);
      setOpenConfirm(false);
      setSelected(null);
      await loadTasks();
    } finally {
      setDeleting(false);
      setLoading(false);
    }
  };

  return (
    <div className="wrap relative">
      <h2>Quản lý công việc</h2>

      <div className="card center">
        <InputTask onAdd={loadTasks} />
      </div>

      <div className="card center">
        <div className="group filters">
          <button className="active">Tất cả</button>
          <button>Đã xong</button>
          <button>Đang thực hiện</button>
        </div>
      </div>

      <Tasks tasks={tasks} onToggle={handleToggle} onAskDelete={askDelete} />

      <div className="actions">
        <button className="danger">Xóa công việc hoàn thành</button>
        <button className="danger">Xóa tất cả công việc</button>
      </div>

      <DeleteTask
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        confirming={deleting}
        message={
          selected ? `Bạn chắc chắn muốn xóa: "${selected.name_task}"?` : ""
        }
      />

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Spinner
            animation="border"
            role="status"
            variant="light"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}
