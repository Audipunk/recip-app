import React, { useState } from "react";
import{CookTime, PrepTime, Published, TotalTime}from "../TimeAndDate/TimeConvertor";
import Tags from "../Tags/Tags";
import Description from "../Description/Description";
import Allergens from "../Allergens/allergens";
import DropDownSVG from "../IconsAndSvg's/DropDownSVG";
import CoverImage from "../Images/CoverImage";
import IngredientsList from "../Ingredients/IngredientsList";


const Recipe = ({ recipe, Allergies }) => {
  const [showTags, setShowTags] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  if (!recipe) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="bg-white p-4 rounded shadow mb-4 lg:flex">
        <div className="lg:w-1/2">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <CoverImage images={recipe.images} title={recipe.title} />
          <div className="mt-4 text-gray-600">
            <p>
              <b>Servings</b>: {recipe.servings}
            </p>
          </div>
          <div className="mt-4 text-gray-600">
            <p>
              <b>Category</b>: {recipe.category}
            </p>
          </div>
          <div className="mt-4 text-gray-600">
            <button
              onClick={() => setShowTags(!showTags)}
              className="bg-yellow-500 hover:bg-yellow-600 flex flex-row text-white font-bold py-2 px-4 rounded mb-4"
            >
              <b>Tags</b>
              <DropDownSVG />
            </button>
            {showTags && (
              <div>
                <Tags recipe={recipe} />
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/2 p-4">
          <Description description={recipe.description} recipeId={recipe._id} />
          <PrepTime prepTime={recipe.prep} />
          <CookTime cookTime={recipe.cook} />
          <TotalTime totalTime={recipe} />
          <Allergens allergens={Allergies} />
          <h3 className="mt-2 text-lg font-semibold">Ingredients:</h3>
          <IngredientsList ingredients={Object.entries(recipe.ingredients)} />
          <CookTime
            cookTimeInMinutes={recipe.cook}
            label={"Total Cooking Time"}
          />
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white flex flex-row font-bold py-2 px-4 rounded mb-4"
          >
            <h3 className="text-lg font-semibold">Instructions</h3>
            <DropDownSVG />
          </button>
          {/* {showInstructions && <RecipeInstructions recipes={recipe} />}
          <UpdateRecipeInstructions /> */}
          <div className="text-gray-600 mt-4">
            <Published published={recipe.published} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
