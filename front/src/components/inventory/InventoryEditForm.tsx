import React from "react";
import { CATEGORY_OPTIONS } from "../../constants/categoryOptions";

interface InventoryEditFormProps {
  name: string;
  quantity: number;
  min_quantity: number;
  category: string;
  expiration_date: string;
  memo: string;
  onNameChange: (value: string) => void;
  onQuantityChange: (value: number) => void;
  onMinQuantityChange: (value: number) => void;
  onCategoryChange: (value: string) => void;
  onExpirationDateChange: (value: string) => void;
  onMemoChange: (value: string) => void;
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
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-1 border rounded"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
