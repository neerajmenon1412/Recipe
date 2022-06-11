import { Injectable } from '@angular/core';
import { Recipe } from './recipes/recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes:Recipe[] = [
    //     new Recipe('Test Recipe1',
    //      'This is just a test1',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1xvM8B5GC14pHVbURFyAsVD_qjdf-bBKK6g&usqp=CAU',
    //       [
    //           new Ingredient('Meat', 1),
    //           new Ingredient('French Fries', 20)
    //       ]),
    //     new Recipe('Test Recipe2',
    //      'This is just a test2',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1xvM8B5GC14pHVbURFyAsVD_qjdf-bBKK6g&usqp=CAU',
    //       [
    //         new Ingredient('Potatoes', 2),
    //         new Ingredient('Capsicum', 1)
    //       ])
    //   ];

    private recipes:Recipe[] = [];

      constructor(private slService: ShoppingListService, private router: ActivatedRoute){

      }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        console.log(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientstoShoppingList(ingredients: Ingredient[]){
            this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
            this.recipes.push(recipe);
            this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
            this.recipes[index] = newRecipe;
            this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
}