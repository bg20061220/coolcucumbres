import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# Load your dataset
data = pd.read_csv("flood_data (1).csv")

# Create binary flood label
data['flood_label'] = (data['chance_of_flood'] >= 0.5).astype(int)

# Features and target
X = data[['latitude', 'longitude', 'year']]
y = data['flood_label']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = make_pipeline(StandardScaler(), RandomForestClassifier(n_estimators=300, random_state=42))
model.fit(X_train, y_train)

# --- 🔹 User input for new location ---
latitude = float(input("Enter latitude: "))
longitude = float(input("Enter longitude: "))
year = int(input("Enter year: "))

new_location = pd.DataFrame([[latitude, longitude, year]],
                            columns=['latitude', 'longitude', 'year'])

confidence_score = model.predict_proba(new_location)[0][1]

# Predict probability (confidence score)
confidence_score = model.predict_proba(new_location)[0][1]
predicted_label = int(confidence_score >= 0.5)

print(f"\n📍 Location: ({latitude}, {longitude}) in {year}")
print(f"Predicted flood confidence: {confidence_score:.2f}")
print("Predicted label:", "⚠️ Flood" if predicted_label else "✅ No Flood")

