
export interface Category {
  categoryId: string;
  parentCategoryId?: string;
  categoryName: string;
  categoryUrl: string;
}

export interface CategoryListResult {
  large: Category[];
  medium: Category[];
  small: Category[];
}

export interface Recipe {
  recipeId: string;
  recipeTitle: string;
  foodImageUrl: string;
  recipeUrl?: string;
  recipeMaterial?: string[];
  recipeIndication?: string;
  recipeCost?: string;
 
}


const BASE_URL = 'https://app.rakuten.co.jp/services/api/Recipe';


const applicationId = import.meta.env.VITE_RAKUTEN_APP_ID;
if (!applicationId) {
  throw new Error('Rakuten API application ID (VITE_RAKUTEN_APP_ID) is not set');
}


let cachedCategories: CategoryListResult | null = null;


export async function getCategoryList(): Promise<CategoryListResult> {
  if (cachedCategories) {
    return cachedCategories;
  }
  const response = await fetch(`${BASE_URL}/CategoryList/20170426?applicationId=${applicationId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category list');
  }
  const data = await response.json() as { result: CategoryListResult };
  cachedCategories = data.result;
  return data.result;
}


export async function getCategoryRanking(categoryId: string): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/CategoryRanking/20170426?applicationId=${applicationId}&categoryId=${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category ranking');
  }
  const data = await response.json() as { result: Recipe[] };
  return data.result;
}
