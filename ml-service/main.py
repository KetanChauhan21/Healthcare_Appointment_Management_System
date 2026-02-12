# ml-model/app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load('./models/disease-predictor.pkl')


@app.route('/test')
def test():
    return jsonify({"status": "OK"})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['symptoms']
    prediction = model.predict([data])
    return jsonify({'disease': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True,port=5000)