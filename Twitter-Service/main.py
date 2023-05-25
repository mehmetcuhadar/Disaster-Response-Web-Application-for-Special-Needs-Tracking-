import time
import json
from transformers import pipeline
import tweepy
import datetime
import pytz
from pymongo import MongoClient

# Model
ner_pipe = pipeline("token-classification", "hny17/finetune_ner")
intent_pipe = pipeline("text-classification", "hny17/finetune_req")

# Twitter tokens
bearer_token = "AAAAAAAAAAAAAAAAAAAAAFGWmwEAAAAAWyB6K98ZlDcPeoGipF1boVb0lcU%3DYS7g9Z2Ny8M1cxaH4vI7s8OyLqBanO2g57pIgswPaeYhsrT44T"
api_key = "tPvhOVJ9cGgHR4yGERZyx1iya"
api_secret = "HP9V9JZttSkns1IeMa844glzVODofe7k8olMRrJdrYPZ5vJKMv"
access_token = "1649053227793645582-9a0B2C0s3ReYlCzy9J2KvmRzSuRP6K"
access_token_secret = "QmIs74ulBcs4gbxim2662rs7TBJwZN7ADVtwuP7sF0mYC"

auth = tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)
# api = tweepy.API(auth)
api = tweepy.API(auth, wait_on_rate_limit=True)

keyword = "#acilafadyardım"
time_window = datetime.timedelta(minutes=1)
timezone = pytz.timezone('Europe/Istanbul')
processed_tweet_ids = set()

client = MongoClient('mongodb+srv://mcuhadar18:ee8iLI9KF5HpYpoM@adress.qai6yhk.mongodb.net/input-log?retryWrites=true&w=majority')
db = client['input_log']
collection = db['twitter_data']

while True:
    current_time = datetime.datetime.now(timezone)

    for tweet in tweepy.Cursor(api.search_tweets, q=keyword).items():
        tweet_time = tweet.created_at.astimezone(timezone)
        time_difference = current_time - tweet_time

        if tweet.id in processed_tweet_ids:
            continue

        if time_difference <= time_window:
            text_without_hashtags = ''.join(word for word in tweet.text if not word.startswith('#'))
            # print(text_without_hashtags)
            location = ner_pipe(text_without_hashtags)
            # print(location)
            request = intent_pipe(text_without_hashtags)
            # print(request)
            processed_tweet_ids.add(tweet.id)

            location_data = {
                'il_title': '',
                'ilce_title': '',
                'mahalle_title': '',
                'sokak_cadde_title': '',
                'site_title': '',
                'apartman_title': '',
                'tel_number': ''
            }

            for entity in location:
                if entity['entity'] == 'B-il':
                    location_data['il_title'] = entity['word']
                elif entity['entity'] == 'I-il':
                    location_data['il_title'] = ' ' + entity['word']
                elif entity['entity'] == 'B-ilce':
                    location_data['ilce_title'] = entity['word']
                elif entity['entity'] == 'I-ilce':
                    location_data['ilce_title'] = ' ' + entity['word']
                elif entity['entity'] == 'B-mahalle':
                    location_data['mahalle_title'] = entity['word']
                elif entity['entity'] == 'I-mahalle':
                    location_data['mahalle_title'] = ' ' + entity['word']
                elif entity['entity'] == 'B-sokak':
                    location_data['sokak_cadde_title'] = entity['word']
                elif entity['entity'] == 'I-sokak':
                    location_data['sokak_cadde_title'] = ' ' + entity['word']
                elif entity['entity'] == 'B-site':
                    location_data['site_title'] = entity['word']
                elif entity['entity'] == 'I-site':
                    location_data['site_title'] = ' ' + entity['word']
                elif entity['entity'] == 'B-apartman':
                    location_data['apartman_title'] = entity['word']
                elif entity['entity'] == 'I-apartman':
                    location_data['apartman_title'] = ' ' + entity['word']
                elif entity['entity'] == 'B-tel':
                    location_data['tel_number'] = entity['word']
                elif entity['entity'] == 'I-tel':
                    location_data['tel_number'] = ' ' + entity['word']

            input_data = {
                'id': str(tweet.id),
                'il_title': location_data['il_title'],
                'ilce_title': location_data['ilce_title'],
                'mahalle_title': location_data['mahalle_title'],
                'sokak_cadde_title': location_data['sokak_cadde_title'],
                'site_title': location_data['site_title'],
                'apartman_title': location_data['apartman_title'],
                'tel_number': location_data['tel_number'],
                'ihtiyac_title': request['label'],
                'add_info': request['add_info'],
                'created_at': tweet_time,
                'status': 'active'
            }

            collection.insert_one(input_data)
            print("Data inserted into MongoDB")

            processed_tweet_ids.add(tweet.id)

    time.sleep(3)
