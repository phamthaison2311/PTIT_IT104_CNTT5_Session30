type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirming?: boolean;
};

export default function DeleteTask({
  open,
  title = "Xác nhận xóa",
  message = "Bạn có chắc muốn xóa công việc này?",
  onCancel,
  onConfirm,
  confirming,
}: Props) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onCancel}
          aria-label="Đóng"
        >
          ×
        </button>

        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button type="button" className="btn outline" onClick={onCancel}>
            Hủy
          </button>
          <button
            type="button"
            className="btn danger"
            onClick={onConfirm}
            disabled={confirming}
          >
            {confirming ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}
