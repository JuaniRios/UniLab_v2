from .general_settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
PORT = '8000'
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

API_URL = "http://127.0.0.1:8000"
WEBSITE_URL = "http://127.0.0.1:3000"

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]