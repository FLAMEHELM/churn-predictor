# Churn Prediction API 

Сервис предсказывает вероятность оттока клиента телеком-компании на основе его данных 

## Демо 
https://churn-predictor-nw73.onrender.com/

## Модель 
LightGBM, ROC-AUC: 0.84 

## Запуск локально 
\`\`\`bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
\`\`\`

## Стек 
FastAPI, LightGBM, scikit-learn, Docker 