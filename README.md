# 🚀 Attack-GAN NIDS: Synthetic Attack Data Generation for Intrusion Detection

Attack-GAN NIDS is a machine learning-based **Intrusion Detection System (IDS)** that utilizes a **Conditional Tabular GAN (CTGAN)** to generate **synthetic attack logs** and test their effectiveness against traditional IDS models such as **Random Forest, KNN, and Decision Tree**.

This project aims to **bypass IDS models** by generating adversarial attack data and analyzing the detection performance of existing classifiers.

---

## 📌 Features
✅ **CTGAN-based Synthetic Data Generation**: Generates attack samples that mimic real-world network intrusions.  
✅ **Supervised IDS Models**: Trains **Random Forest, Decision Tree, and KNN** classifiers for binary attack detection.  
✅ **Attack Simulation**: Tests whether the IDS can detect synthetic attacks, helping to improve security defenses.  
✅ **Distributed GAN Training**: Supports training on different datasets across multiple systems and merging models.  
✅ **Data Preprocessing Pipeline**: Normalizes numerical features and encodes categorical attributes.  
✅ **Visualizations**: Plots **GAN loss curves**, confusion matrices, and cumulative sum feature comparisons.  

---

## 📂 Project Structure
```
├── .gitignore
├── README.md
├── attack-gan/
│   ├── .next/
│   ├── app/
│   ├── components/
│   ├── node_modules/
│   ├── public/
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.mjs
├── backend/
│   ├── __pycache__/
│   ├── generated/
│   │   └── generated_data.csv
│   ├── model/
│   │   ├── ctgan_initial_61.pkl
│   │   ├── gan.pkl
│   │   ├── generator.h5
│   │   ├── ids.joblib
│   │   ├── ids.pkl
│   │   ├── model.pkl
│   │   ├── sampled_data.csv
│   │   ├── scaler.joblib
│   │   ├── text.txt
│   │   └── themodel.ipynb
│   ├── app.py
├── models/
│   ├── data/
│   │   ├── dataset/
│   │   └── pre_processed/
│   ├── gan/
│   │   ├── generated_csv/
│   │   ├── benign_data.csv
│   │   ├── cgan.ipynb
│   │   ├── cwgan.ipynb
│   │   ├── denormalize.py
│   │   ├── denormalized_data.csv
│   │   ├── gan_model.ipynb
│   │   ├── gan_model2.ipynb
│   │   ├── ids_random_forest.ipynb
│   │   ├── preprocess.ipynb
│   │   ├── preprocessed_data_denorm.csv
│   │   ├── preprocessed_test.csv
│   │   ├── random_forest_model.joblib
│   │   └── random_forest_model.pkl
├── ids/
│   ├── ctgan_initial.pkl
├── requirements.txt
├── Dockerfile
```
## 🔧 Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Taurus1601/attack-gan-nids.git
cd attack-gan-nids
```
2️⃣ Install Dependencies

Make sure you have Python 3.9 installed, then install required libraries:
`
pip install -r requirements.txt
`
If you’re using Google Colab, install the YData Synthetic library:
`
pip install ydata-synthetic
`
3️⃣ Train the IDS Models

Run the following command to train the classification models:
`
python train_ids.py
`
4️⃣ Train the GAN Model

Train the GAN to generate attack samples:
`
python train_gan.py
`
5️⃣ Generate Synthetic Attack Logs
`
python generate_attack.py --samples 1000
`
6️⃣ Start Backend API

Run th  Flask backend:
`
python3 app.py
`
7️⃣ Start React Frontend

Navigate to the frontend folder and start the React app:
`
cd frontend
npm install
npm run dev
`
🚀 Usage
	•	Open the React frontend.
	•	Select the number of synthetic attack samples to generate.
	•	The backend processes the request, generating attack logs using the GAN.
	•	The IDS classifiers evaluate whether the synthetic attack logs are detected.
	•	View the confusion matrix and detection rates for synthetic attacks.

📊 Model Evaluation
	•	Confusion Matrix
	•	✅ Ideally, the GAN should generate attack logs that the IDS misclassifies.
	•	🔴 If detection is high, we improve the GAN model to generate more evasive samples.
	•	Feature Comparison
	•	📉 Cumulative sum analysis of real vs. generated data.
	•	🧪 Kolmogorov-Smirnov test to measure statistical similarity.
	•	GAN Training Visualization
	•	📈 Loss curves for Generator (G_loss) and Discriminator (D_loss).

📌 Future Improvements
	•	✅ Integrate Federated GAN Training across multiple systems.
	•	✅ Optimize GAN architecture with LSTM layers for sequential attack generation.
	•	✅ Improve Adversarial Training by fine-tuning the attack GAN to maximize IDS evasion.
	•	✅ Add Deep Learning-based IDS models (CNN, LSTMs) for comparison.


👨‍💻 Authors
	•	Sanjan  - Lead Developer
	•	Varun Anoodh Rajat - Team

🌎 References
	•	CTGAN Paper: https://arxiv.org/abs/1907.00503
	•	YData-Synthetic Documentation: https://github.com/ydataai/ydata-synthetic
	•	Intrusion Detection Dataset: https://www.unb.ca/cic/datasets/ids.html

⭐ Star this repo if you find it useful!
Feel free to contribute and improve this project! 🚀

---
