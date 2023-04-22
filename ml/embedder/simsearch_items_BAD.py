import weaviate as wv
import json

client = wv.Client(
    url="http://localhost:8080",  # Replace with your endpoint

)

nearText = {"concepts": ["sunflower oil"]}

result = (
    client.query
    .get("SourceFood", ["food_item", "co2_footprint_kg"])
    .with_near_text(nearText)
    .with_limit(10)
    .do()
)

print(json.dumps(result, indent=2))