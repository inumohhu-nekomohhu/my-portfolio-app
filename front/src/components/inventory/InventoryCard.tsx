// frontend/src/components/inventory/InventoryCard.tsx
import React from "react";

interface PantryItem {
  id: number;
  name: string;
  category: string;
  expiration_date: string; // ISO 8601 形式など、日付文字列
  photo_url?: string;
}

interface InventoryCardProps {
  item: PantryItem;
  onClick: () => void;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item, onClick }) => {
  // 賞味期限までの日数を計算する関数
  const calculateDaysRemaining = (expiration: string): number => {
    const today = new Date();
    const exp = new Date(expiration);
    // 差分をミリ秒単位で取得し、日数に変換
    const diffTime = exp.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = calculateDaysRemaining(item.expiration_date);

  // デフォルトはグレーの枠。期限切れなら赤、残り3日以内なら黄色にする。
  let borderColorClass = "border-green-300";
  if (daysRemaining < 0) {
    borderColorClass = "border-red-500";
  } else if (daysRemaining <= 3) {
    borderColorClass = "border-yellow-500";
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white p-2 rounded shadow-lg cursor-pointer border-2 ${borderColorClass}`}
    >
      {item.photo_url ? (
        <img
          src={item.photo_url}
          alt={item.name}
          className="w-72 h-72 object-cover rounded-md"
        />
      ) : (
        <div className="w-72 h-72 flex items-center justify-center bg-gray-200 rounded-md">
          <span className="text-gray-500">画像なし</span>
        </div>
      )}
      <h3 className="text-lg font-bold mt-2">{item.name}</h3>
      <p className="text-gray-600">{item.category}</p>
      <p className="text-gray-700">
        賞味期限: {item.expiration_date}{" "}
        {daysRemaining >= 0 ? `(あと ${daysRemaining} 日)` : "(期限切れ)"}
      </p>
    </div>
  );
};

export default InventoryCard;
