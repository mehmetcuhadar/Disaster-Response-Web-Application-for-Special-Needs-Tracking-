from transformers import pipeline
import tweepy

# Models
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
num_tweets = 5
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
            print(text_without_hashtags)
            location = ner_pipe(text_without_hashtags)
            print(location)
            request = intent_pipe(text_without_hashtags)
            print(request)
            processed_tweet_ids.add(tweet.id)

    time.sleep(2)
