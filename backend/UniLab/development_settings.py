from .general_settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
PORT = '8000'
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

API_URL = "127.0.0.1"
WEBSITE_URL = "127.0.0.1"

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]