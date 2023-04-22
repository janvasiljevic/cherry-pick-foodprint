import weaviate as wv
import json

client = wv.Client(
    url="http://localhost:8080",  # Replace with your endpoint

)

nearText = {"concepts": ["healthy chicken pasta with tomta sauce. Cripsy chicken with a creamy sauce, high protein and low carb.t"]}

result = (
    client.query
    .get("Recipe", ["name", "description"])
    .with_near_text(nearText)
    .with_limit(10)
    .do()
)

print(json.dumps(result, indent=2))