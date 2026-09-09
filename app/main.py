import pandas as pd
from fastapi import FastAPI
from app.schemas import ChurnRequest, ChurnResponse
from app.model_loader import getPipeline
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title='Churn Prediction API')

app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/")
def root():
    return FileResponse("app/static/index.html")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=ChurnResponse)
def predict(request: ChurnRequest):
    pipeline = getPipeline()
    input_df = pd.DataFrame([request.model_dump()])
    proba = pipeline.predict_proba(input_df)[0,1]
    return ChurnResponse(
        churn_probability=round(float(proba), 4),
        churn_prediction=bool(proba > 0.5)
    )

