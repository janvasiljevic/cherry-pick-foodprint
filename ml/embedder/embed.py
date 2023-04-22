import weaviate as wv
import numpy as np
import pandas as pd

data_file = "../scraped/recipes_list.csv"

# Load data
df = pd.read_csv(data_file)

# Connect to Weaviate
client = wv.Client("http://localhost:8080")

# create weaviate schema

# # object should have a recipe name and a description
# class_obj = {
#       "class": "Recipe",
#       "description": "Recipe class for smmilartiy search engine",
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
#           "description": "Content that will be vectorized",
#           "moduleConfig": {
#             "text2vec-transformers": {
#               "skip": False,
#               "vectorizePropertyName": False
#             }
#           },
#           "name": "Description"
#         },
#         {
#           "dataType": [
#             "text"
#           ],
#           "description": "Name of the recipe",
#           "moduleConfig": {
#             "text2vec-transformers": {
#               "skip": False,
#               "vectorizePropertyName": False
#             }
#           },
#           "name": "Name"
#         },
#         {
#           "dataType": [
#             "text"
#           ],
#           "description": "URL of the recipe",
#           "moduleConfig": {
#             "text2vec-transformers": {
#               "skip": True,
#               "vectorizePropertyName": False
#             }
#           },
#           "name": "Url"
#         }
#       ],
#       "vectorizer": "text2vec-transformers"
# }

# client.schema.create_class(class_obj)

# # Configure a batch process
# with client.batch as batch:
#     
#     for i, d in enumerate(data):
#         properties = {
#             "answer": d["Answer"],
#             "question": d["Question"],
#             "category": d["Category"],
#         }

#         client.batch.add_data_object(properties, "Question")

with client.batch as batch:
    batch.batch_size=100
    for i, d in enumerate(df.to_dict('records')):
        properties = {
            "Description": d["description"],
            "Name": d["name"],
            "Url": d["url"],
        }

        client.batch.add_data_object(properties, "Recipe")