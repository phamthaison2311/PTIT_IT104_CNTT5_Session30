export interface Task {
  id: number;
  name_task: string;
  status: boolean;
}

type TasksProps = {
  tasks: Task[];
  onToggle?: (id: number, checked: boolean) => void;
  onAskDelete?: (task: Task) => void; 
};

export default function Tasks({ tasks, onToggle, onAskDelete }: TasksProps) {
  return (
    <ul>
      {tasks.map((i) => (
        <li key={i.id} className={i.status ? "done" : ""}>
          <input
            type="checkbox"
            className="checkbox"
            checked={i.status}
            onChange={(e) => onToggle?.(i.id, e.target.checked)}
          />
          <span>{i.name_task}</span>

          <button
            type="button"
            className="icon-btn"
            onClick={() => onAskDelete?.(i)}
            aria-label="Xóa"
            title="Xóa"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}
