import weaviate as wv
import pandas as pd

data_file = "../scraped/recipes_list.csv"

# Load data
df = pd.read_csv(data_file)

# Connect to Weaviate
client = wv.Client("http://localhost:8080")

with client.batch as batch:
    batch.batch_size=100
    for i, d in enumerate(df.to_dict('records')):
        properties = {
            "Description": d["description"],
            "Name": d["name"],
            "Url": d["url"],
        }

        client.batch.add_data_object(properties, "Recipe")