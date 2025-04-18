// frontend/src/components/inventory/InventoryModal.tsx
import React, { useState } from "react";
import ToastNotification from "./ToastNotification";
import InventoryDetails from "./InventoryDetails";
import InventoryEditForm from "./InventoryEditForm";
import apiClient from "../../utils/axiosClient";

interface PantryItem {
  id: number;
  name: string;
  category: string;
  expiration_date: string;
  quantity: number;
  min_quantity: number;
  memo?: string;
  updated_at?: string;
  photo_url?: string;
}

interface InventoryModalProps {
  item: PantryItem;
  onClose: () => void;
  onEditSuccess: (updatedItem: PantryItem) => void;
  onDeleteSuccess: (deletedId: number) => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  item,
  onClose,
  onEditSuccess,
  onDeleteSuccess,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: item.name,
    quantity: item.quantity,
    min_quantity: item.min_quantity,
    category: item.category,
    expiration_date: item.expiration_date,
    memo: item.memo || "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  // 賞味期限までの日数計算
  const calculateDaysRemaining = (expDate: string): number => {
    const today = new Date();
    const expiry = new Date(expDate);
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };
  const daysRemaining = calculateDaysRemaining(item.expiration_date);

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedItem({
      name: item.name,
      quantity: item.quantity,
      min_quantity: item.min_quantity,
      category: item.category,
      expiration_date: item.expiration_date,
      memo: item.memo || "",
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await apiClient.patch(
        `/api/v1/pantry_items/${item.id}`,
        { pantry_item: editedItem },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      setToastType("success");
      setToastMessage("登録に成功しました！");
      setTimeout(() => {
        setToastMessage(null);
        setIsEditing(false);
        onEditSuccess(response.data);
      }, 2000);
    } catch (error) {
      console.error("更新エラー:", error);
      setToastType("error");
      setToastMessage("登録に失敗しました……時間を置いて再度お試しください");
      setTimeout(() => {
        setToastMessage(null);
      }, 2000);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");
    try {
      await apiClient.delete(
        `/api/v1/pantry_items/${item.id}`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );
      setToastType("success");
      setToastMessage("削除しました");
      setTimeout(() => {
        setToastMessage(null);
        onDeleteSuccess(item.id);
      }, 1500);
    } catch (error) {
      console.error("削除エラー:", error);
      setToastType("error");
      setToastMessage("削除に失敗しました……時間をおいて再度お試しください");
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* 右上の大きめ×ボタン */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl p-1"
          aria-label="閉じる"
        >
          ×
        </button>

        {toastMessage && <ToastNotification message={toastMessage} type={toastType!} />}

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "編集モード" : item.name}
        </h2>

        {item.photo_url && (
          <img
            src={item.photo_url}
            alt={item.name}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}

        {showConfirm ? (
          <>
            <h3 className="text-lg font-semibold mb-4">
              このデータを削除してよろしいですか？
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                いいえ
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                はい
              </button>
            </div>
          </>
        ) : (
          <>
            {isEditing ? (
              <InventoryEditForm
                name={editedItem.name}
                quantity={editedItem.quantity}
                min_quantity={editedItem.min_quantity}
                category={editedItem.category}
                expiration_date={editedItem.expiration_date}
                memo={editedItem.memo}
                onNameChange={(val) => setEditedItem({ ...editedItem, name: val })}
                onQuantityChange={(val) => setEditedItem({ ...editedItem, quantity: val })}
                onMinQuantityChange={(val) => setEditedItem({ ...editedItem, min_quantity: val })}
                onCategoryChange={(val) => setEditedItem({ ...editedItem, category: val })}
                onExpirationDateChange={(val) => setEditedItem({ ...editedItem, expiration_date: val })}
                onMemoChange={(val) => setEditedItem({ ...editedItem, memo: val })}
              />
            ) : (
              <InventoryDetails item={item} daysRemaining={daysRemaining} />
            )}

            <div className="flex justify-between mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    編集をやめる
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    登録
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    削除
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    編集
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
