export interface recipeData{
    name: string;
    description: string;
    ingredients: { name: string; amount: number }[] | string;
    _id: string
    imagePath?: string;
  }