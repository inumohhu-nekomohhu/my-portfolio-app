// frontend/src/components/inventory/InventoryEditForm.tsx
import React from "react";

interface InventoryEditFormProps {
  name: string;
  quantity: number;
  min_quantity: number;      // 追加
  category: string;
  expiration_date: string;
  memo: string;              // 追加
  onNameChange: (value: string) => void;
  onQuantityChange: (value: number) => void;
  onMinQuantityChange: (value: number) => void;  // 追加
  onCategoryChange: (value: string) => void;
  onExpirationDateChange: (value: string) => void;
  onMemoChange: (value: string) => void;         // 追加
}

const InventoryEditForm: React.FC<InventoryEditFormProps> = ({
  name,
  quantity,
  min_quantity,
  category,
  expiration_date,
  memo,
  onNameChange,
  onQuantityChange,
  onMinQuantityChange,
  onCategoryChange,
  onExpirationDateChange,
  onMemoChange,
}) => {
  return (
    <div className="space-y-2">
      <div>
        <strong>名称:</strong>{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="p-1 border rounded"
        />
      </div>
      <div>
        <strong>数量:</strong>{" "}
        <input
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
          className="p-1 border rounded w-20"
        />
      </div>
      <div>
        <strong>最小在庫レベル:</strong>{" "}
        <input
          type="number"
          value={min_quantity}
          onChange={(e) => onMinQuantityChange(parseInt(e.target.value, 10))}
          className="p-1 border rounded w-20"
        />
      </div>
      <div>
        <strong>カテゴリー:</strong>{" "}
        <input
          type="text"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-1 border rounded"
        />
      </div>
      <div>
        <strong>賞味期限:</strong>{" "}
        <input
          type="date"
          value={expiration_date}
          onChange={(e) => onExpirationDateChange(e.target.value)}
          className="p-1 border rounded"
        />
      </div>
      <div>
        <strong>メモ:</strong>{" "}
        <input
          type="text"
          value={memo}
          onChange={(e) => onMemoChange(e.target.value)}
          className="p-1 border rounded"
        />
      </div>
    </div>
  );
};

export default InventoryEditForm;
