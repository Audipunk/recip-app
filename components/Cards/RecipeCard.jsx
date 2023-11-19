/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import Image from "next/legacy/image";
import { StarIcon as StarFilled } from "@heroicons/react/24/solid";
import { StarIcon as StarEmpty } from "@heroicons/react/24/outline";
import { CookTime, PrepTime, TotalTime } from "../TimeAndDate/TimeConvertor";
import FavoritesContext from "../Context/Favorites-context";
import ViewRecipeDetails from "../Buttons/ViewRecipeButton/ViewRecipe";
import { useTheme } from "../Context/ThemeContext";
import Loading from "../Loading/Loading";
import Title from "./Title";

function RecipeCard({
  recipe, searchQuery, favorites, Key,
}) {
  const { theme } = useTheme();

  if (!recipe) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // eslint-disable-next-line no-underscore-dangle, react/prop-types
  const firstImage =
    recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe.image;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const favoriteCtx = useContext(FavoritesContext);
  const recipeIsFavorite = favoriteCtx.recipeIsFavorite(recipe._id, favorites);

  const removeFavoriteHandler = async () => {
    try {
      const response = await fetch(`api/recipes/Favourites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: recipe._id }),
      });

      if (response.ok) {
        favoriteCtx.removeFavorite(recipe._id);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error removing favorite:", error);
    }
  };

  // eslint-disable-next-line consistent-return
  const addFavoritesHandler = async () => {
    try {
      const response = await fetch(`api/recipes/Favourites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      favoriteCtx.addFavorite(recipe);
      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <div
      key={Key}
      className={`${
        theme === "light" ? "text-black bg-blue-300" : "text-white bg-gray-700"
      } rounded shadow mt-8 mb-4 flex flex-col transform transition-transform hover:scale-105`}
    >
      <div className="w-full h-56 md:h-92 mb-4 relative aspect-h-9">
        <Image
          src={firstImage}
          // eslint-disable-next-line react/prop-types
          alt={recipe.title}
          layout="fill"
          objectFit="cover"

        />
      </div>
      <div className="flex flex-col justify-between h-22 mb-2 ">

        <div
          className={`mb-4 text-center ${
            theme === "dark" ? "text-white" : ""
          } `}
        >
          <Title
            key={`${recipe._id}${recipe.title}`}
            title={recipe.title}
            searchQuery={[searchQuery]}
          />
          <div className="mb-1">
            <PrepTime prepTime={recipe.prep} />
          </div>
          <div className="mb-">
            <CookTime cookTime={recipe.cook} />
          </div>
          <TotalTime totalTime={recipe} />
        </div>
        <div>
          {recipeIsFavorite ? (
            <button type="button" onClick={removeFavoriteHandler}>
              <span aria-label="Remove from favorites">
                <StarFilled
                  className={`w-6 h-6 ${
                    theme === "light" ? "text-blue-900" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          ) : (
            // eslint-disable-next-line react/button-has-type
            <button onClick={addFavoritesHandler}>
              <span>
                <StarEmpty
                  className={`w-6 h-6 ${
                    theme === "dark" ? "text-white" : "text-custom-blue-10"
                  }`}
                />
              </span>
            </button>
          )}
        </div>
        <ViewRecipeDetails recipe={recipe} />
      </div>
    </div>
  );
}

export default RecipeCard;
