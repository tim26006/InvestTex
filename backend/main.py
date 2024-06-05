
from fastapi import FastAPI

app = FastAPI()


@app.get("/getImage")
async def root():
    return {"message": "Hello World"}

