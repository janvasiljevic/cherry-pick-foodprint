import weaviate as wv
import numpy as np
import pandas as pd
import tqdm 

data_file = "../data/merged.csv"

# Load data
df = pd.read_csv(data_file)

# set missing values to 0
df = df.fillna(-1)

# Connect to Weaviate
client = wv.Client("http://localhost:8080")

# food_group,food_item,co2_footprint_kg,co2_footprint_uncertainty,Water Footprint kg,water_footprint_uncertainty

with client.batch as batch:
    batch.batch_size=100
    for i, d in tqdm.tqdm(enumerate(df.to_dict('records'))):
        properties = {
            "food_item": d["food_item"].lower().replace("_", " ").replace("-", " "),
            "food_group": d["food_group"],
            "co2_footprint_kg": d["co2_footprint_kg"],
            "co2_footprint_uncertainty": d["co2_footprint_uncertainty"],
            "water_footprint_kg": d["Water Footprint kg"],
            "water_footprint_uncertainty": d["water_footprint_uncertainty"]
        }

        client.batch.add_data_object(properties, "SourceFood")