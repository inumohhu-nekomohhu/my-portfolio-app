import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // ✅ 追加：画面遷移用
import apiClient from '../../utils/axiosClient';
import Header from '../common/Header';
import { CATEGORY_OPTIONS } from "../../constants/categoryOptions";

interface MessageProps {
  type: 'success' | 'error';
  message: string;
}
const Message: React.FC<MessageProps> = ({ type, message }) => {
  const baseClass = 'mb-4 p-2 border rounded';
  const className =
    type === 'error'
      ? `${baseClass} bg-red-100 text-red-600 border-red-300`
      : `${baseClass} bg-blue-100 text-blue-700 border-blue-300`;
  return <div className={className}>{message}</div>;
};

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
const InputField: React.FC<InputFieldProps> = ({ id, label, type, placeholder, value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      required={required}
    />
  </div>
);

interface PantryItem {
  id: number;
  name: string;
  quantity: number;
  min_quantity: number;
  category: string;
  expiration_date: string;
  photo_url?: string;
  memo?: string;
  updated_at?: string;
}

interface InventoryFormProps {
  onSuccess?: (newItem: PantryItem) => void;
  onCancel?: () => void;
  showHeader?: boolean;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  onSuccess,
  onCancel,
  showHeader = true
}) => {
  const navigate = useNavigate(); // ✅ 追加：画面遷移フック

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [category, setCategory] = useState('野菜');
  const [expirationDate, setExpirationDate] = useState('');
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [memo, setMemo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setItemImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const token = localStorage.getItem("jwt");
    if (!token) {
      setErrorMessage("認証トークンがありません。再度ログインしてください。");
      return;
    }

    const formData = new FormData();
    formData.append('pantry_item[name]', itemName);
    formData.append('pantry_item[quantity]', quantity.toString());
    formData.append('pantry_item[min_quantity]', minQuantity.toString());
    formData.append('pantry_item[category]', category);
    formData.append('pantry_item[expiration_date]', expirationDate);
    formData.append('pantry_item[memo]', memo);
    if (itemImage) formData.append('item_image', itemImage);

    try {
      const res = await apiClient.post('/api/v1/pantry_items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccessMessage('食品情報を登録しました！');

      if (onSuccess) {
        setTimeout(() => onSuccess(res.data), 1000);
      }

      // ページ遷移から来ている場合のみ、在庫一覧に自動遷移
      if (showHeader) {
        setTimeout(() => navigate("/inventory"), 1000);
      }

    } catch (error) {
      console.error('在庫追加エラー:', error);
      setErrorMessage('在庫追加に失敗しました。');
    }
  };

  return (
    <>
      {showHeader && <Header />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">在庫アイテム追加</h2>
          {successMessage && <Message type="success" message={successMessage} />}
          {errorMessage && <Message type="error" message={errorMessage} />}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="itemName"
              label="アイテム名"
              type="text"
              placeholder="例: 牛乳"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
              required
            />
            <InputField
              id="quantity"
              label="数量"
              type="number"
              placeholder="例: 2"
              value={quantity}
              onChange={e => setQuantity(+e.target.value)}
              required
            />
            <InputField
              id="minQuantity"
              label="最小在庫レベル"
              type="number"
              placeholder="例: 3"
              value={minQuantity}
              onChange={e => setMinQuantity(+e.target.value)}
              required
            />
            <div>
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">カテゴリー</label>
              <select
                id="category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                {CATEGORY_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                </option>
                ))}
              </select>
            </div>
            <InputField
              id="expirationDate"
              label="賞味期限"
              type="date"
              value={expirationDate}
              onChange={e => setExpirationDate(e.target.value)}
              required
            />
            <div>
              <label htmlFor="memo" className="block text-gray-700 font-bold mb-2">メモ</label>
              <textarea
                id="memo"
                value={memo}
                onChange={e => setMemo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="itemImage" className="block text-gray-700 font-bold mb-2">画像アップロード</label>
              <input id="itemImage" type="file" onChange={handleFileChange} className="w-full" />
            </div>

            {/* ボタン左右分離表示（キャンセルはモーダル時のみ） */}
            <div className="flex justify-between mt-4">
              {showHeader ? (
                <div />
              ) : (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  キャンセル
                </button>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                追加する
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default InventoryForm;
