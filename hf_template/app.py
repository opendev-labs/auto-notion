from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def greet_json():
    return {
        "system": "Auto-Notion Agency",
        "status": "online",
        "brain": "Gemini 2.0 Flash + HF Workers",
        "message": "The Agency Control Plane is active."
    }
