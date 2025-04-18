// frontend/src/components/inventory/InventoryDetails.tsx
import React from "react";

interface PantryItem {
  id: number;
  name: string;
  category: string;
  expiration_date: string;
  quantity: number;
  min_quantity: number; // 追加
  memo?: string;       // 追加（メモはオプショナル）
  updated_at?: string;
  photo_url?: string;
}

interface InventoryDetailsProps {
  item: PantryItem;
  daysRemaining: number;
}

const InventoryDetails: React.FC<InventoryDetailsProps> = ({ item, daysRemaining }) => {
  return (
    <div className="space-y-2">
      <div>
        <strong>数量:</strong> {item.quantity}
      </div>
      <div>
        <strong>最小在庫レベル:</strong> {item.min_quantity}
      </div>
      <div>
        <strong>カテゴリー:</strong> {item.category}
      </div>
      <div>
        <strong>賞味期限:</strong> {item.expiration_date}{" "}
        {daysRemaining >= 0 ? `(あと ${daysRemaining} 日)` : "(期限切れ)"}
      </div>
      <div>
        <strong>メモ:</strong> {item.memo || "-"}
      </div>
      <div>
        <strong>最終更新日:</strong>{" "}
        {item.updated_at
          ? new Date(item.updated_at).toLocaleDateString()
          : "-"}
      </div>
    </div>
  );
};

export default InventoryDetails;
