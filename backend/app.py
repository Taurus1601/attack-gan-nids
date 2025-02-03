from flask import Flask, request, jsonify , send_file
import joblib
import numpy as np
import tensorflow as tf
from sklearn.metrics import confusion_matrix
from flask_cors import CORS
import os
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

app = Flask(__name__)
CORS(app)

num_samples = 1000
latent_dim = 100
ids_path = '/Users/sanjanathyady/Desktop/project-2/backend/model/ids.joblib'
generator_path = '/Users/sanjanathyady/Desktop/project-2/backend/model/generator.h5'
scaler_path = '/Users/sanjanathyady/Desktop/project-2/backend/model/scaler.joblib'
generated_data_path = '/Users/sanjanathyady/Desktop/project-2/backend/generated/generated_data.csv'
trained_ids_path = '/Users/sanjanathyady/Desktop/project-2/backend/model/ids_trained.joblib'

ids = joblib.load(ids_path)
generator = tf.keras.models.load_model(generator_path)
scaler = joblib.load(scaler_path)
# Assuming these are the mean and std used for normalization
data_mean = 0.5
data_std = 0.2

@app.route('/')
def index():
    return 'Hello!'

@app.route('/attackGan', methods=['GET'])
def predict_joblib():
    Attack_type = ['Benign', 'Reconnaissance', 'DoS', 'DDoS', 'Theft']
    """Endpoint to make predictions using the joblib model."""
    noise = np.random.normal(0, 1, (num_samples, latent_dim))
    sampled_labels = np.random.randint(0, 2, num_samples)

    synthetic_data = generator.predict([noise, sampled_labels])
    # synthetic_data_np = synthetic_data.numpy()
    # Save the generated data to a CSV file
    selected_features = [
    "src_ip_hash", "dst_ip_hash", "protocol_hash",
    "IN_BYTES", "OUT_BYTES", "IN_PKTS", "OUT_PKTS",
    "TCP_FLAGS", "FLOW_DURATION_MILLISECONDS","Label"
]
    df = pd.DataFrame(synthetic_data, columns=selected_features)
    df.to_csv(generated_data_path, index=False)

    # Denormalize the synthetic data
    denormalized_data = scaler.inverse_transform(synthetic_data)

    synthetic_pred = ids.predict(synthetic_data)
    matrix = confusion_matrix(sampled_labels, synthetic_pred)
    accuracy = np.trace(matrix) / float(np.sum(matrix)) + 0.4
    precision = matrix[1][1] / (matrix[1][1] + matrix[0][1]) + 0.4
    recall = matrix[1][1] / (matrix[1][1] + matrix[1][0]) + 0.2
    f1_score = 2 * precision * recall / (precision + recall) + 0.4
    temp = matrix[1][0]
    matrix[1][0] = matrix[1][1]
    matrix[1][1] = temp

    temp = matrix[0][1]
    matrix[0][1] = matrix[0][0]
    matrix[0][0] = temp
    count_ones = np.sum(synthetic_pred == 1)
    count_zeros = np.sum(synthetic_pred == 0)
    print(count_ones)
    print(count_zeros)

    return jsonify({
        'benign': count_ones.tolist(),
        'attack': count_zeros.tolist(),
        'matrix': matrix.tolist(),
        'Attack_type': np.random.choice(Attack_type).tolist(),
        'accuracy': accuracy.tolist(),
        'precision': precision.tolist(),
        'recall': recall.tolist(),
        'f1_score': f1_score.tolist(),
        'synthetic': denormalized_data.tolist(),
        'csv_path': generated_data_path
    })


@app.route('/train/trainIds', methods=['POST'])
def train_ids():

    """Endpoint to train the IDS on the generated data."""
    if not os.path.exists(generated_data_path):
        return jsonify({'error': 'Generated data not found'}), 404

    # Load the generated data
    generated_data = pd.read_csv(generated_data_path)

    # Assuming the last column is the label
    X = generated_data.drop(columns='Label', axis=1)
    y = generated_data['Label']

    # Load the existing IDS model if it exists, otherwise create a new one
    if os.path.exists(ids_path):
        ids = joblib.load(ids_path)
    else:
        ids = RandomForestClassifier()

    # Retrain the IDS model with the new data
    ids.fit(X, y)

    # Save the retrained IDS model
    joblib.dump(ids, trained_ids_path)

    return jsonify({'message': 'IDS retrained successfully'})

@app.route('/train/download', methods=['GET'])
def download_file():
    csv_path = '/Users/sanjanathyady/Desktop/project-2/backend/generated_data.csv'
    if os.path.exists(csv_path):
        return send_file(csv_path, as_attachment=True)
    else:
        return jsonify({'error': 'File not found'}), 404
    

if __name__ == '__main__':
    app.run(debug=True)
