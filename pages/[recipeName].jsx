import { useRouter } from "next/router";
import Recipe from "../components/Recipes/Recipe";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const RecipePage = () => {
  const router = useRouter();
  const { recipeName } = router.query;

  // Fetch recipe data and allergens using useSWR
  const { data, error } = useSWR(`api/recipes/${recipeName}`, fetcher);

  if (error || !data) {
    return <div>Loading...</div>;
  }

  const { recipe, allergens } = data;

  if (!recipe || !recipe.description || !allergens) {
    console.log(`Can't find Recipe for:`, JSON.stringify(recipe));
  }

  return (
    <div>
      <Recipe
        recipe={recipe}
        description={recipe.description}
        Allergies={allergens}
      />
    </div>
  );
};

export default RecipePage;
