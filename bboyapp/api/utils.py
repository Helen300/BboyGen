from django.contrib.auth import authenticate
import json

import jwt
import requests

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username