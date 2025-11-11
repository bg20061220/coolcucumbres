from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import pandas as pd

# Load data
data = pd.read_csv("flood_data (1).csv")

# Features and target
X = data[['latitude', 'longitude', 'year']]
y = data['chance_of_flood']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Pipeline: scaling + Random Forest
model = make_pipeline(StandardScaler(), RandomForestRegressor(n_estimators=300, random_state=42))
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("MSE:", mean_squared_error(y_test, y_pred))
print("R²:", r2_score(y_test, y_pred))

# ---- PREDICTION SECTION ----
# Get user input
lat = float(input("Enter latitude: "))
lon = float(input("Enter longitude: "))
year = int(input("Enter year: "))

# Prepare the input as a DataFrame (must match training features)
new_data = pd.DataFrame([[lat, lon, year]], columns=['latitude', 'longitude', 'year'])

# Predict flood chance
predicted_flood_chance = model.predict(new_data)[0]
print(f"Predicted chance of flood: {predicted_flood_chance:.2f}")

