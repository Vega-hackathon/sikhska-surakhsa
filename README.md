# sikhska-surakhsa

# Vega Dropout Risk Prediction System - Backend

This backend application powers the Insightful Guardian platform, providing machine learning-powered predictions for student dropout risks. It's built with **FastAPI**, integrates a pre-trained scikit-learn model, and leverages **Groq** to generate natural language explanations for the predictions.

## Features

- **Teacher Authentication:** Secure login using JWT tokens.
- **Student Management:** Add new students to the CSV-based tracking database and fetch student records with custom sorting metrics.
- **Risk Prediction:** Utilizes a pre-trained ML model (`dropout_model_full.pkl`) to instantly categorize students into LOW, MEDIUM, or HIGH risk.
- **AI Explanations:** Automatically generates contextual explanations for why a student was flagged (powered by Groq / LLaMA 3).
- **Dashboard Stats:** Aggregate analytics endpoint for tracking risk distribution across semesters and overall departments.
- **Mentor Assignment:** API endpoint to associate at-risk students with specific faculty mentors.

## Prerequisites

- **Python 3.8+**
- A **Groq API Key** (for LLaMA 3 explanation generation)

## Installation & Setup

1. **Clone the repository and enter the backend directory:**
    ```bash
    cd Backend/vega-back
    ```

2. **Create and activate a virtual environment (optional but recommended):**
    ```bash
    python -m venv venv
    venv\Scripts\activate  # Windows
    # source venv/bin/activate  # macOS/Linux
    ```

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Environment Variables:**
    Create a `.env` file in the root directory (`vega-back/.env`) and add your Groq API key:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```

5. **Ensure the Data Directory is Populated:**
   The application expects the following files to exist:
   - `model/dropout_model_full.pkl` (The pickled ML model package)
   - `data/teachers.csv` (For authentication lookup)
   - `data/students.csv` (Created automatically if it doesn't exist)
   - `data/mentor.csv` (Created automatically if it doesn't exist)

## Running the Server

Start the FastAPI unified development server via Uvicorn:

```bash
uvicorn main:app --reload
```

The server will be available at `http://localhost:8000`.

## API Documentation

Once the server is running, FastAPI automatically generates interactive API documentation. You can view and test the endpoints directly from your browser:

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Core Technologies
*   **FastAPI:** Web framework for building APIs.
*   **Pandas:** Data manipulation and analysis of CSV files.
*   **Scikit-Learn (Pickle):** Loading and running the Random Forest risk prediction model.
*   **Groq API:** Interfacing with LLMs for human-readable risk explanations.
*   **Python-Jose / Passlib:** JWT authentication implementation.
