document.getElementById('churnForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = {
        gender: "Female", SeniorCitizen: 0, Partner: "No", Dependents: "No",
        tenure: Number(formData.get('tenure')),
        PhoneService: "Yes", MultipleLines: "No",
        InternetService: formData.get('InternetService'),
        OnlineSecurity: "No", OnlineBackup: "No", DeviceProtection: "No",
        TechSupport: "No", StreamingTV: "No", StreamingMovies: "No",
        Contract: formData.get('Contract'),
        PaperlessBilling: "Yes", PaymentMethod: "Electronic check",
        MonthlyCharges: Number(formData.get('MonthlyCharges')),
        TotalCharges: Number(formData.get('MonthlyCharges')) * Number(formData.get('tenure'))
    };

    const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json();

    const resultDiv = document.getElementById('result');
    const percent = (data.churn_probability * 100).toFixed(1);
    resultDiv.style.background = data.churn_prediction ? '#ffcccc' : '#ccffcc';
    resultDiv.textContent = `Вероятность оттока: ${percent}%`;
});