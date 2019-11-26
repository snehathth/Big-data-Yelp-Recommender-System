import pandas as pd
import numpy as np
from lightfm import LightFM
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import requests
import flask
from flask import request, jsonify
from flask import escape
import logging
from string import Template
from google.cloud import bigquery
import os

def main(request):
    
    
    client = bigquery.Client()
    query = client.query("""SELECT name, business_id FROM `recommendationengine-for-yelp.recommendation_data.businesses` WHERE RAND() < 10/(SELECT COUNT(*) FROM `recommendationengine-for-yelp.recommendation_data.businesses`) LIMIT 10""")
    df_b = query.result().to_dataframe()
    
    return df_b.to_json(orient='records')