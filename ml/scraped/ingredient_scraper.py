import requests
import bs4
import re
import json
import pandas
from tqdm import tqdm

data_to_process = "recipes_list.csv"
data_processed = "recipes_list_processed.csv"
BASE_URL = "https://www.bbcgoodfood.com" 

def get_ingredients_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print('Error', response.status_code)

def get_ingredients(html):
    soup = bs4.BeautifulSoup(html, 'html.parser')
    # section with class="recipe__ingredients"
    ingredients = soup.find('section', {'class': 'recipe__ingredients'}).find('ul').find_all('li')
    ingredient_out = []
    # get ingredient name, quantity, unit
    for ingredient in ingredients:
        data = []
        for child in ingredient.children:
            data.append(child.text.strip().replace('\n', '').replace(',', ''))

        ingredient_out.append(data)
    
    return ingredient_out


def main():
    recipes = pandas.read_csv(data_to_process)
    data_out = {
        "url": "",
        "quantity_unit": "",
        "item": "",
    }
    output = []
    for index, row in tqdm(recipes.iterrows()):
        url = BASE_URL + row['url']
        print(url)
        try:
          ingredients = get_ingredients_page(url)
          scraped = get_ingredients(ingredients)
          for ingredient in scraped:
            if(len(ingredient) == 2):
              data_out['quantity_unit'] = ingredient[0]
              data_out['item'] = ingredient[1]
              data_out['url'] = url
            else:
              continue

            # make a copy of the data_out dictionary and append it to the output list
            output.append(data_out.copy())

        except Exception as e:
          print(e)
          continue
        
    df = pandas.DataFrame(output)
    df.to_csv(data_processed, index=False)

if __name__ == '__main__':
    main()