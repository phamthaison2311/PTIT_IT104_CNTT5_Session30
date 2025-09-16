import React, { useState } from "react";
import axios from "axios";

export default function InputTask({ onAdd }: { onAdd: () => void }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await axios.post("http://localhost:3000/tasks", {
        name_task: name,
        status: false,
      });
      setName(""); 
      onAdd();     
    } catch (err) {
      console.error("Lỗi khi thêm công việc", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group form">
        <input
          type="text"
          placeholder="Nhập tên công việc"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Thêm công việc</button>
      </div>
    </form>
  );
}
