import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, LabelEncoder

# Print the current working directory
print("Current Working Directory:", os.getcwd())

# Load the original dataset to fit the scaler
data_path = '../data/dataset.csv'  # Replace with the correct file path
if not os.path.exists(data_path):
    raise FileNotFoundError(f"The file {data_path} does not exist.")

df = pd.read_csv(data_path)

# Filter the dataset to keep only the specified labels
labels_to_keep = ['Benign', 'Reconnaissance', 'DDoS', 'DoS', 'Theft']
df = df[df['Attack'].isin(labels_to_keep)]

# Handle missing values (only for numeric columns)
numeric_columns = df.select_dtypes(include=[np.number]).columns
df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

# Encode the labels
label_encoder = LabelEncoder()
df['Label'] = label_encoder.fit_transform(df['Attack'])

# Encode other categorical variables (if any)
for column in df.select_dtypes(include=['object']).columns:
    if column != 'Attack':  # Skip the Attack column
        df[column] = label_encoder.fit_transform(df[column])

# Normalize the features (excluding the label column)
features = df.drop(columns=['Attack', 'Label'])
scaler = MinMaxScaler()
scaler.fit(features)  # Fit the scaler on the original data

# Load the preprocessed dataset
preprocessed_data_path = '../data/preprocessed_dataset.csv'  # Replace with the correct file path
if not os.path.exists(preprocessed_data_path):
    raise FileNotFoundError(f"The file {preprocessed_data_path} does not exist.")

preprocessed_df = pd.read_csv(preprocessed_data_path)

# Extract the features from the preprocessed dataset
preprocessed_features = preprocessed_df.drop(columns=['Label']).values

# Denormalize the preprocessed features
denormalized_features = scaler.inverse_transform(preprocessed_features)

# Convert denormalized features back to a DataFrame
denormalized_data = pd.DataFrame(denormalized_features, columns=features.columns)

# If you need to add the labels back (assuming you have them)
denormalized_data['Label'] = preprocessed_df['Label']

# Save the denormalized data to a new CSV file
denormalized_data_path = '../data/denormalized_dataset.csv'  # Replace with the desired file path
denormalized_data.to_csv(denormalized_data_path, index=False)
print(f"Denormalized data saved to {denormalized_data_path}")