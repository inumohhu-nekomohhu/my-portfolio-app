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
  photo_url?: string;
}

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // トークン取得関数
  const getAuthToken = () => {
    return localStorage.getItem("jwt"); // JWTトークンをlocalStorageから取得
  };

  useEffect(() => {
    (async () => {
      const token = getAuthToken(); // トークンを取得
      console.log(token); // トークンが正しく取得されているか確認
      if (!token) {
        setError("認証が必要です");
        setLoading(false);
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };
        console.log("送信ヘッダー:", headers);  // ← 追加（API叩く直前のJWT確認）

        const res = await apiClient.get("/api/v1/pantry_items", {
          headers: { Authorization: `Bearer ${token}` } // トークンをヘッダーにセット
        });
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
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">在庫一覧</h2>
          {/* ① データを追加ボタン */}
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

      {/* ② 追加用モーダル */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <InventoryForm
              onSuccess={(newItem) => {
                setItems(prev => [newItem, ...prev]);   // ⑤ 一覧に即時反映
                setShowAddModal(false);                 // ④ モーダルを閉じる
              }}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {/* 既存の編集用モーダル */}
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
