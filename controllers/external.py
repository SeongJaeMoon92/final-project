import os
from flask import Blueprint, request
import requests

api = Blueprint('external', __name__)

@api.route('/companies', methods=['GET'])
def search_companies():
    url = 'https://api.companieshouse.gov.uk/search/companies'
    headers = {'Authorization': os.environ.get('COMPANIES_HOUSE_KEY')}
    company = request.args.get('q')
    payload = {'q': company}
    r = requests.get(url, headers=headers, params=payload)
    return r.text
