import pandas as pd
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
import ast

# Load dataset
data = pd.read_csv('./Data/Dataset.csv')

data['symptoms'] = data['symptoms'].apply(ast.literal_eval)

# Convert symptoms to binary features
mlb = MultiLabelBinarizer()
symptoms_encoded = pd.DataFrame(
    mlb.fit_transform(data['symptoms']),
    columns=mlb.classes_
)

le = LabelEncoder()
diseases_encoded = le.fit_transform(data['disease'])

# Save processed data
symptoms_encoded.to_csv('symptoms.csv', index=False)
pd.Series(diseases_encoded).to_csv('diseases.csv', index=False)

# Optional: Save label mappings
pd.Series(le.classes_).to_csv('disease_labels.csv', index=False)