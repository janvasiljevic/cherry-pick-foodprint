import weaviate as wv

# Connect to Weaviate
client = wv.Client("http://localhost:8080")

# create weaviate schema

# object should have a recipe name and a description
class_obj = {
      "class": "Recipe",
      "description": "Recipe class for smmilartiy search engine",
      "moduleConfig": {
        "text2vec-transformers": {
          "poolingStrategy": "masked_mean",
          "vectorizeClassName": False
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-transformers": {
              "skip": False,
              "vectorizePropertyName": False
            }
          },
          "name": "Description"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "Name of the recipe",
          "moduleConfig": {
            "text2vec-transformers": {
              "skip": False,
              "vectorizePropertyName": False
            }
          },
          "name": "Name"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "URL of the recipe",
          "moduleConfig": {
            "text2vec-transformers": {
              "skip": True,
              "vectorizePropertyName": False
            }
          },
          "name": "Url"
        }
      ],
      "vectorizer": "text2vec-transformers"
}

# client.schema.create_class(class_obj)

# create a schema for embedding source food items
# food_group,food_item,co2_footprint_kg,co2_footprint_uncertainty,Water Footprint kg,water_footprint_uncertainty
# cols= ['food_group','co2_footprint_kg','co2_footprint_uncertainty','Water Footprint kg','water_footprint_uncertainty']

# def col2type(col):
#     return {
#           "dataType": [
#             "text"
#           ],
#           "description": col.capitalize().replace("_"," "),
#           "moduleConfig": {
#             "text2vec-transformers": {
#               "skip": True,
#               "vectorizePropertyName": False
#             }
#           },
#           "name": col.capitalize().replace("_"," ")
#         }

# cols = [col2type(col) for col in cols]
    
# class_obj = {
#       "class": "SourceFood",
#       "description": "Source food class for matching food items to computed food items",
#       "moduleConfig": {
#         "text2vec-transformers": {
#           "poolingStrategy": "masked_mean",
#           "vectorizeClassName": False
#         }
#       },
#       "properties": [
#         {
#           "dataType": [
#             "text"
#           ],
#           "description": "Food item",
#           "moduleConfig": {
#             "text2vec-transformers": {
#               "skip": False,
#               "vectorizePropertyName": False
#             }
#           },
#           "name": "food_item"
#         },
        
#         *cols
#       ],
#       "vectorizer": "text2vec-transformers"
# }

