# ml-model/train.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load preprocessed data
X = pd.read_csv('../Data/symptoms.csv')
y = pd.read_csv('../Data/diseases.csv')

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# Save model
joblib.dump(model, 'disease1-predictor.pkl')