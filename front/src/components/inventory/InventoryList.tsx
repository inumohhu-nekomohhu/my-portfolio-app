import React, { useEffect, useState } from "react";
import apiClient from "../../utils/axiosClient";
import InventoryCard from "./InventoryCard";
import InventoryModal from "./InventoryModal";
import InventoryForm from "./InventoryForm";
import Header from "../common/Header";

interface PantryItem {
  id: number;
  name: string;
  category: string;
  expiration_date: string;
  quantity: number;
  min_quantity: number;
  memo?: string;
  updated_at?: string;
  image_url?: string;
}

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem("jwt");
  };

  useEffect(() => {
    (async () => {
      const token = getAuthToken();
      console.log(token);
      if (!token) {
        setError("認証が必要です");
        setLoading(false);
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        console.log("送信ヘッダー:", headers);

        const res = await apiClient.get("/api/v1/pantry_items", {
          headers: { Authorization: `Bearer ${token}` }
        });console.log(res.data); 
        setItems(res.data);
      } catch (err) {
        console.error("在庫一覧取得エラー:", err);
        setError("在庫データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">在庫一覧</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            データを追加
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {items.map(item => (
            <InventoryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
            <InventoryForm
              showHeader={false} // モーダルではヘッダー非表示
              onSuccess={(newItem) => {
                setItems(prev => [newItem, ...prev]);
                setShowAddModal(false);
              }}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {selectedItem && (
        <InventoryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onEditSuccess={(updated) => {
            setItems(prev =>
              prev.map(it => it.id === updated.id ? updated : it)
            );
            setSelectedItem(updated);
          }}
          onDeleteSuccess={(deletedId) => {
            setItems(prev => prev.filter(it => it.id !== deletedId));
            setSelectedItem(null);
          }}
        />
      )}
    </>
  );
};

export default InventoryList;
