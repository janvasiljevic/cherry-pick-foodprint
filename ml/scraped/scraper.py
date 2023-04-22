import requests
import bs4
import re
import json
import pandas
from tqdm import tqdm
types = [
    "side-dish",
    "main-course",
    "lunch",
    "starter",
    "dinner",
]

MAIN_URL = 'https://www.bbcgoodfood.com/search?page={}&mealType={}'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
}

def get_page(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.text
    else:
        print('Error', response.status_code)

def get_recipes(html, meal_type):
    soup = bs4.BeautifulSoup(html, 'html.parser')
    # find articles with data-item-type="recipe"
    recipes = soup.find_all('article', {'data-item-type': 'recipe'})

    recipe_out = []
    # get recipe name, url, image_url,  description
    for recipe in recipes:
        try:
          recipe_name = recipe.find("h2").text

          recipe_url = recipe.find("a")['href']

          recipe_image_url = recipe.find("img")['src']
          recipe_alt = recipe.find("img")['alt']

          recipe_description = recipe.find("p", {"class", "card__description"}).text

          recipe = {
              'meal_type': meal_type,
              'name': recipe_name,
              'url': recipe_url,
              'image_url': recipe_image_url,
              'alt': recipe_alt,
              'description': recipe_description
          }
          recipe_out.append(recipe)
          # print(recipe)
        except:
           print('Error, recipe not found')
           continue
    
    return recipe_out

recipes = []
for meal_type in types:
    print(f"Getting recipes for {meal_type}...")
    try:
        page = get_page(MAIN_URL.format(30, meal_type))
        rcps = get_recipes(page, meal_type)
        recipes.extend(rcps)
    except Exception as e:
        print(e)


df = pandas.DataFrame(recipes)

# export to csv
df.to_csv("recipes_list.csv")

        