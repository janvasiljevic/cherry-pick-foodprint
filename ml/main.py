import pandas as pd
import matplotlib.pyplot as plt

DATA = "data/food_db.xlsx"
CO2_SHEET ="SEL CF for users"
WATER_SHEET ="SEL WF for users"

# read data

df_co2 = pd.read_excel(DATA, sheet_name=CO2_SHEET)
df_water = pd.read_excel(DATA, sheet_name=WATER_SHEET)

# keepy only "Food commodity ITEM", "Water Footprint liters water/kg o liter of food ITEM", "Water Footprint cc water/g o cc of food sub-TYPOLOGY" "Uncertainty    low  (L)  high (H)"
df_water_clean = df_water[["Food commodity ITEM", "Water Footprint liters water/kg o liter of food ITEM", "Water Footprint cc water/g o cc of food sub-TYPOLOGY", "Uncertainty    low  (L)  high (H)"]]

# rename water uncertainty to "Water Footprint Uncertainty"
df_water_clean = df_water_clean.rename(columns={"Uncertainty    low  (L)  high (H)": "Water Footprint Uncertainty"})

# rename co2 uncertainty to "CO2 Footprint Uncertainty"
df_co2 = df_co2.rename(columns={"Uncertainty    low (L) high (H)": "CO2 Footprint Uncertainty"})

# PRINT COLUMN NAMES
print(df_co2.columns)
print(df_water_clean.columns)

# MERGE BY COLUMN NAME "Food commodity ITEM", ignore items with no possible join
df = pd.merge(df_co2, df_water_clean, on="Food commodity ITEM", how="left")

# PRINT COLUMN NAMES
print(df.columns)

# keep only columns:
# "FOOD COMMODITY GROUP"
# "Food commodity ITEM"
# "CO2 Footprint kg CO2/kg o kg of food ITEM"  _> rename to "CO2 Footprint kg"
# "CO2 Footprint Uncertainty"
# "Water Footprint liters water/kg o liter of food ITEM" _> rename to "Water Footprint kg"
# "Water Footprint Uncertainty"

df = df[["FOOD COMMODITY GROUP", "Food commodity ITEM", "Carbon Footprint kg CO2eq/kg or l of food ITEM", "CO2 Footprint Uncertainty", "Water Footprint liters water/kg o liter of food ITEM", "Water Footprint Uncertainty"]]
df = df.rename(columns={"CO2 Footprint kg CO2/kg o kg of food ITEM": "CO2 Footprint kg", "Water Footprint liters water/kg o liter of food ITEM": "Water Footprint kg"})


# rename columns to more readable names with underscores.
# food




# export to xlsx
df.to_excel("data/merged.xlsx")

# export to csv
df.to_csv("data/merged.csv")