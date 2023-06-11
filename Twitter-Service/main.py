import time
import requests
import urllib3
from transformers import pipeline
import tweepy
import datetime
import pytz
import locale

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Model
ner_pipe = pipeline("token-classification", "hny17/finetune_ner")
intent_pipe = pipeline("text-classification", "hny17/finetune_req")

# Twitter tokens
# bearer_token = "AAAAAAAAAAAAAAAAAAAAAFGWmwEAAAAAWyB6K98ZlDcPeoGipF1boVb0lcU%3DYS7g9Z2Ny8M1cxaH4vI7s8OyLqBanO2g57pIgswPaeYhsrT44T"
# api_key = "tPvhOVJ9cGgHR4yGERZyx1iya"
# api_secret = "HP9V9JZttSkns1IeMa844glzVODofe7k8olMRrJdrYPZ5vJKMv"
# access_token = "1649053227793645582-9a0B2C0s3ReYlCzy9J2KvmRzSuRP6K"
# access_token_secret = "QmIs74ulBcs4gbxim2662rs7TBJwZN7ADVtwuP7sF0mYC"
bearer_token = "AAAAAAAAAAAAAAAAAAAAAFGWmwEAAAAAi5f14AT8dscp%2FL6XCfs2l5AJ%2BFE%3DZ1ZLoBdL9oUBonfWYmPSFqaCM1zWXKUXuw9sVglu0HvZsV2OQs"
api_key = "jvgexrUza8159zxXdxk3vS8e8"
api_secret = "nh83YO2tPR0MqZhbSD7LdEgmcKuPXf9WErQagHPpbkHX35xMuN"
access_token = "1649053227793645582-LqJZGz3jXRbdUjuPBMbnrhjuDMs5cl"
access_token_secret = "3TNkkPcBXeMYEYEBmn7E0qf3PqUNfTvqf6Uo2QMuE0mCh"

auth = tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)
# api = tweepy.API(auth)
api = tweepy.API(auth, wait_on_rate_limit=True)

keyword = "#acilafadyardım"
time_window = datetime.timedelta(minutes=1)
timezone = pytz.timezone('Europe/Istanbul')
processed_tweet_ids = set()


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

            request_data = {
                'label': '',
                'add_info': ''
            }


            for entity in location:
                # İl
                if entity['entity'] == 'B-il':
                    location_data['il_title'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-il':
                    if entity['word'].startswith('##'):
                        location_data['il_title'] += entity['word'][2:]
                    else:
                        location_data['il_title'] += ' ' + entity['word']
                # İlçe
                elif entity['entity'] == 'B-ilce':
                    location_data['ilce_title'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-ilce':
                    if entity['word'].startswith('##'):
                        location_data['ilce_title'] += entity['word'][2:]
                    else:
                        location_data['ilce_title'] += ' ' + entity['word']
                # Mahalle
                elif entity['entity'] == 'B-mahalle':
                    location_data['mahalle_title'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-mahalle':
                    if entity['word'].startswith('##'):
                        location_data['mahalle_title'] += entity['word'][2:]
                    else:
                        location_data['mahalle_title'] += ' ' + entity['word']
                # Sokak
                elif entity['entity'] == 'B-sokak':
                    location_data['sokak_cadde_title'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-sokak':
                    if entity['word'].startswith('##'):
                        location_data['sokak_cadde_title'] += entity['word'][2:]
                    else:
                        location_data['sokak_cadde_title'] += ' ' + entity['word']
                # Site
                elif entity['entity'] == 'B-site':
                    location_data['site_title'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-site':
                    if entity['word'].startswith('##'):
                        location_data['site_title'] += entity['word'][2:]
                    else:
                        location_data['site_title'] += ' ' + entity['word']
                # Apartman
                elif entity['entity'] == 'B-Apartman/Site':
                    location_data['apartman_title'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-Apartman/Site':
                    if entity['word'].startswith('##'):
                        location_data['apartman_title'] += entity['word'][2:]
                    else:
                        location_data['apartman_title'] += ' ' + entity['word']
                # Tel No
                elif entity['entity'] == 'B-tel':
                    location_data['tel_number'] = entity['word'].replace('##', '')
                elif entity['entity'] == 'I-tel':
                    if entity['word'].startswith('##'):
                        location_data['tel_number'] += entity['word'][2:]
                    else:
                        location_data['tel_number'] += ' ' + entity['word']
            
            for entity in request:
                request_data["label"] = entity["label"]

            

            # Set the locale to Turkish
            locale.setlocale(locale.LC_ALL, 'tr_TR.UTF-8')

            input_data = {
                'il_title': location_data['il_title'].upper(),
                'ilce_title': location_data['ilce_title'].upper(),
                'mahalle_title': location_data['mahalle_title'],
                'sokak_cadde_title': location_data['sokak_cadde_title'],
                'site_title': location_data['site_title'],
                'apartman_title': location_data['apartman_title'],
                'tel_number': location_data['tel_number'],
                'add_info': tweet.text
            }

            if request_data['label'] == 'Kurtarma':
                input_data['ihtiyac_title'] = 'Kurtarma Ekibi'
            else:
                input_data['ihtiyac_title'] = request_data['label']


            print(input_data)
            print("Data inserted into MongoDB")
            post_url = 'https://localhost:3001'


            # POST random data to addInput endpoint
            requests.get(f'{post_url}/addInput', params= input_data, verify=False)
            processed_tweet_ids.add(tweet.id)

    time.sleep(59)
