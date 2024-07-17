import requests
import time

# Your Facebook access token
access_token = 'EAAAAUaZA8jlABOzNZCressXB4Kal4ZBJtIvZCoZBeheSCr8b8aVuH27klGqhy6SrZCm7jGmM56m6Du7tyJORqOJcfuIrePlL9ojtkYVdo8Wh9aLHMPv2ghdAmWA1LV6qd0Y0hPJgtbHykiOWjHlToufWfEVTeiur5oAE5dmZCosZCmHw7gzjRhCyab8fXFOIvHzxh7FFSegpWQZDZD'

# The ID of the post you want to share
post_id = '438138465762171'

# The message you want to include with the shared post
message = 'Check this out!'

# The Graph API endpoint to share a post
graph_api_url = f'https://graph.facebook.com/me/feed'

# Function to share a post
def share_post(access_token, post_id, message, privacy='SELF'):
    url = graph_api_url
    params = {
        'access_token': access_token,
        'link': f'https://www.facebook.com/{post_id}',
        'message': message,
        'privacy': f'{{"value":"{privacy}"}}',
    }
    response = requests.post(url, params=params)
    return response.status_code, response.json()

# Share the post 5 times
for i in range(20000):
    status_code, response_json = share_post(access_token, post_id, message)
    if status_code == 200:
        print(f'Post shared successfully! ({i + 1}/5)')
    else:
        print(f'Failed to share post ({i + 1}/5). Status code: {status_code}')
        print(response_json)
    time.sleep(1)  # Sleep for 1 second between shares to avoid rate limiting
