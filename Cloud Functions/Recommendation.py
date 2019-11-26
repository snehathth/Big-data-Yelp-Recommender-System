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
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'identity' in request_json:
        identity = request_json['identity']
    elif request_args and 'identity' in request_args:
        identity = request_args['identity']
    else:
        return jsonify({'message':'Enter Valid Indentity'})
    
    client = bigquery.Client()
    query = client.query("""SELECT * FROM `recommendationengine-for-yelp.recommendation_data.businesses` """)
    df_b = query.result().to_dataframe()
    tf = TfidfVectorizer(norm='l2',min_df=0, use_idf=True, smooth_idf=False, sublinear_tf=True)
    tfidf_matrix = tf.fit_transform(df_b['category'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    results = {}
    for idx, row in df_b.iterrows():
        similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
        similar_items = [(cosine_similarities[idx][i], df_b['business_id'][i]) for i in similar_indices]
        results[row['business_id']] = similar_items[1:]
 
    def item(id):
        return df_b.loc[df_b['business_id'] == id]['address'].values
 
    def recommend(item_id):
        final = []
        increment = 0
        for rec in results[item_id][:]:
            try:
                start = '160 Las Vegas Blvd N, Las Vegas, NV 89101'
                end = item(rec[1])
                URL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins={0}&destinations={1}&mode=driving&language=fr-FR&key=my-key".format(
                    start, end)
                r = requests.get(url=URL)
                data = r.json()
                string = data['rows'][0]['elements'][0]['distance']['text'].replace(',', '.')
                x = string.replace(' miles', '')
                string = float(x)
                if string<10:
                    final.append(df_b.loc[df_b['business_id'] == rec[1]]['business_id'].values[0])
                    increment = increment+1
                else:
                    print('in else')
                    print(string)
                if increment >=3:
                    break
            except:
                pass
        return final
    final = recommend(item_id=identity)
    df = df_b[df_b['business_id'].isin(final)][['name','address','Alcohol','RestaurantsAttire','Reservations']]
    return df.to_json(orient='records')