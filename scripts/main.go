package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	url := "http://localhost:3000/api-json"

	resp, err := http.Get(url)
	if err != nil {
		log.Fatalf("Error fetching data from %s: %v", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Fatalf("Unexpected status code: %d", resp.StatusCode)
	}

	jsonData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	var data interface{}
	if err := json.Unmarshal(jsonData, &data); err != nil {
		log.Fatalf("Error unmarshalling JSON data: %v", err)
	}

	formattedJSON, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		log.Fatalf("Error formatting JSON data: %v", err)
	}

	if err := ioutil.WriteFile("spec/schema.json", formattedJSON, 0644); err != nil {
		log.Fatalf("Error writing JSON data to file: %v", err)
	}

	log.Println("JSON data successfully saved to schema.json")
}
