from transformers import pipeline
import tweepy

# Model
ner_pipe = pipeline("token-classification", "hny17/finetune_ner")

# Twitter
api_key = "A6lWBmbap4Jzwy0oVqhoCoTs8"
api_secret = "PBJ6GWMtVUd6SQsYZgtZ4Mifiyzvvm5JOmNkbRG3cuzz9BEiNq"
access_token = "1649053227793645582-ocEQ5aC3ugUeIDaC3MOIOAjQlkiV0H"
access_token_secret = "dKh01sWvEHguW9LAUg1yoo9kT7MieAw2wZcjTGculutub"

auth = tweepy.OAuthHandler(api_key, api_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

keyword = "#acilafadyardım"
num_tweets = 3

for tweet in tweepy.Cursor(api.search_tweets, q=keyword).items(num_tweets):
    text_without_hashtags = ''.join(word for word in tweet.text if not word.startswith('#'))
    print(text_without_hashtags)
    prediction = ner_pipe(text_without_hashtags)
    print(prediction)
