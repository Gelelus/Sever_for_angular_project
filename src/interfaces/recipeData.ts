export interface recipeData{
    name: string;
    description: string;
    imagePath: string;
    ingredients: { name: string; amount: number }[];
    id?: string
  }