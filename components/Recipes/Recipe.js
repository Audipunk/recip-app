import { useState } from "react";
import CookTime from "../TimeAndDate/TimeConvertor";
import RecipeInstructions from "../instructions/RecipeInstructions";
import UpdateRecipeInstructions from "../instructions/editRecipeInstructions";
import RecipeDetailTags from "../recipeDetailTags/recipeDetailTag";
import Image from "next/image";
import Description from "../Description/Description";
import Allergens from "../Allergens/allergens";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Recipe = ({ recipe, Allergies }) => {
  const [showTags, setShowTags] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredientsList = Object.entries(recipe.ingredients).map(
    ([ingredient, amount]) => `${ingredient}: ${amount}`
  );


  const firstImage = recipe.images[0];

  return (
    <div className="container mx-auto mt-24 p-4">
      <Link href="/">
        <span className="text-gray-600 text-xl">
          <FaArrowLeft />
        </span>
      </Link>
      <div className="bg-white p-4 rounded shadow mb-4 lg:flex">
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <div>
            <Image
              src={firstImage}
              alt={recipe.title}
              width={300}
              height={300}
              layout="responsive"
              className="max-w-full h-auto object-cover"
            />
          </div>
          <div className="flex mt-4 text-gray-600">
            <div>
              <p>
                <b>Servings</b>: {recipe.servings}
              </p>
            </div>
            <div className="ml-4">
              <p>
                <b>Category</b>: {recipe.category}
              </p>
            </div>
          </div>

          <div className="mt-4 text-gray-600">
            <button
              onClick={() => setShowTags(!showTags)}
              className="bg-yellow-500 hover:bg-yellow-600 flex flex-row text-white font-bold py-2 px-4 rounded mb-4"
            >
              <b>Tags</b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </button>
            {showTags && (
              <div>
                <RecipeDetailTags recipe={recipe} />
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/2 p-4 text-gray-600">
          <Description description={recipe.description} recipeId={recipe._id} />
          <CookTime cookTimeInMinutes={recipe.prep} label={"Prep Time"} />
          <CookTime cookTimeInMinutes={recipe.cook} label={"Cook Time"} />
          <CookTime
            cookTimeInMinutes={recipe.cook}
            prepTimeInMinutes={recipe.prep}
            label="Total Time"
          />
           <Allergens allergens={Allergies} recipeIngredients={ingredientsList} />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredientsList.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
          <CookTime
            cookTimeInMinutes={recipe.cook}
            label={"Total Cooking Time"}
          />
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white flex flex-row font-bold py-2 px-4 rounded mb-4"
          >
            <h3 className="text-lg font-semibold">Instructions</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </button>
          {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions />
        </div>
      </div>
    </div>
  );
};

export default Recipe;
