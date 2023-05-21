from transformers import pipeline
import tweepy

# Model
ner_pipe = pipeline("token-classification", "hny17/finetune_ner")
intent_pipe = pipeline("text-classification", "hny17/finetune_req")

# Twitter
api_key = "yx52sCQywkuXwLWXOwBBHKku8"
api_secret = "2eoL6VqIPUvarBGkHPfqdtCnObGhasVOC1MGEOF0wBlmOjMdEl"
access_token = "1649053227793645582-vwuu3NFaAWsNogxdZXTmf8ptIcEoEl"
access_token_secret = "gg8m1JxmTKdG6plyPyDmOXv0wKqJph91ZER1pgy1Zppga"

auth = tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

keyword = "#acilafadyardım"
num_tweets = 5


for tweet in tweepy.Cursor(api.search_tweets, q=keyword).items(num_tweets):
    text_without_hashtags = ''.join(word for word in tweet.text if not word.startswith('#'))
    print(text_without_hashtags)
    location = ner_pipe(text_without_hashtags)
    print(location)
    request = intent_pipe(text_without_hashtags)
    print(request)
