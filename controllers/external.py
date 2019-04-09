from flask import Blueprint
import requests

api = Blueprint('external', __name__)

@api.route('/companies', methods=['GET'])
def get_companies():
    url = 'https://api.companieshouse.gov.uk/search/companies'
    headers = {'Authorization': 'rU7Lbq3-MmaQRyq8RL6DJ4uMlF3BsfMV3NztRn89'}
    payload = {'q': 'General Assembly'}
    r = requests.get(url, headers=headers, params=payload)
    return r.text
