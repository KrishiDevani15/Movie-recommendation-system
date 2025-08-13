from fastapi import FastAPI
from app.endpoints.top_100_movies import top_100 
from app.endpoints.serach_router import search_router
from app.endpoints.top_category_router import genres_router
from scalar_fastapi import get_scalar_api_reference #type:ignore
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from the specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(top_100)
app.include_router(search_router)
app.include_router(genres_router)

@app.get("/scalar", include_in_schema=False)
async def scalar_html():
    openapi_url = app.openapi_url or "/openapi.json"
    return get_scalar_api_reference(
        openapi_url=openapi_url,
        title="Scalar Movie documentation",
    )
