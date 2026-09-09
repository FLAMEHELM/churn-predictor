import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 
                          'churn_pipeline.pkl')

_pipeline = None

def getPipeline():
    global _pipeline
    if _pipeline is None:
        _pipeline = joblib.load(MODEL_PATH)
    return _pipeline