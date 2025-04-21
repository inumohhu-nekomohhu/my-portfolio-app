import React, { useState } from 'react';
import {
  getCategoryList,
  getCategoryRanking,
  Recipe,
  CategoryListResult,
} from '../services/recipeApi';
import Header from './common/Header'; // ✅ ヘッダー追加

const RecipeSearch: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSearch = async () => {
    const query = keyword.trim();
    if (!query) return;
    try {
      const categories: CategoryListResult = await getCategoryList();
      const lowerQuery = query.toLowerCase();
      let foundCategoryId: string | null = null;

      for (const cat of categories.large) {
        if (cat.categoryName.toLowerCase().includes(lowerQuery)) {
          foundCategoryId = cat.categoryId;
          break;
        }
      }
      if (!foundCategoryId) {
        for (const cat of categories.medium) {
          if (cat.categoryName.toLowerCase().includes(lowerQuery)) {
            foundCategoryId = cat.parentCategoryId
              ? `${cat.parentCategoryId}-${cat.categoryId}`
              : cat.categoryId;
            break;
          }
        }
      }
      if (!foundCategoryId) {
        const mediumParentMap: { [key: string]: string } = {};
        for (const med of categories.medium) {
          if (med.parentCategoryId) {
            mediumParentMap[med.categoryId] = med.parentCategoryId;
          }
        }
        for (const cat of categories.small) {
          if (cat.categoryName.toLowerCase().includes(lowerQuery)) {
            const mediumId = cat.parentCategoryId;
            if (mediumId && mediumParentMap[mediumId]) {
              foundCategoryId = `${mediumParentMap[mediumId]}-${mediumId}-${cat.categoryId}`;
            } else if (mediumId) {
              foundCategoryId = `${mediumId}-${cat.categoryId}`;
            } else {
              foundCategoryId = cat.categoryId;
            }
            break;
          }
        }
      }

      if (foundCategoryId) {
        const ranking = await getCategoryRanking(foundCategoryId);
        setRecipes(ranking.slice(0, 10));
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setRecipes([]);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1932&q=80')",
      }}
    >
      {/* 背景の暗幕 */}
      <div className="absolute inset-0 bg-black opacity-40 z-0" />

      {/* ヘッダーを最上部に横断表示（背景より上、カードより前） */}
      <div className="absolute top-0 left-0 right-0 z-20 w-full">
        <Header />
      </div>

      {/* 検索フォームのカード（画面中央表示） */}
      <div className="relative z-10 w-full max-w-xl bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
          今日の献立は何にする？
        </h1>
        <p className="text-center text-gray-600 mb-4">
          使いたい食材を入力して、美味しいレシピを見つけましょう！<br />
          (例: 豚肉 玉ねぎ キャベツ)
        </p>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="食材名を入力"
            className="flex-1 p-3 rounded border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            レシピを検索
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipeId}
              onClick={() => setSelectedRecipe(recipe)}
              className="cursor-pointer bg-white rounded shadow hover:shadow-md overflow-hidden"
            >
              <img
                src={recipe.foodImageUrl}
                alt={recipe.recipeTitle}
                className="w-full h-32 object-cover"
              />
              <p className="p-2 font-semibold text-gray-800">
                {recipe.recipeTitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* モーダル表示：レシピ詳細 */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 rounded relative">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-3xl"
            >
              &times;
            </button>
            <img
              src={selectedRecipe.foodImageUrl}
              alt={selectedRecipe.recipeTitle}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {selectedRecipe.recipeTitle}
            </h2>
            {selectedRecipe.recipeIndication && (
              <p className="text-gray-600 mb-1">
                ⏱ 所要時間: {selectedRecipe.recipeIndication}
              </p>
            )}
            {selectedRecipe.recipeCost && (
              <p className="text-gray-600 mb-1">
                💰 コスト: {selectedRecipe.recipeCost}
              </p>
            )}
            {selectedRecipe.recipeMaterial && (
              <p className="text-gray-600 mb-3">
                🍳 主な材料: {selectedRecipe.recipeMaterial.join(', ')}
              </p>
            )}
            <a
              href={`https://recipe.rakuten.co.jp/recipe/${selectedRecipe.recipeId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
            >
              作り方を見る！
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
