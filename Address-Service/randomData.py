import requests
import random
import urllib3

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Define base URL
base_url = 'https://localhost:3000'

# Array of Turkish site and apartment names
site_names = ["Doğan", "Doğa", "Gün", "Güneş", "Osmanlı","Dağbaşı","Komando", "Hitit","Özdağ" , "Avcılar", "Kılıçdar"]
apartman_names = ["Canan", "Mehmet", "Doğukan", "Alp", "Hatice", "Pınar", "Ezel", "Koç", "Dana"]

def data_generator() : 
        
    # GET data from endpoints and select randomly
    sehir = random.choice(requests.get(f'{base_url}/getSehir', verify=False).json())
    ilce = random.choice(requests.get(f'{base_url}/getIlce', params={'il_key': sehir['sehir_key']}, verify=False).json())
    mahalle = random.choice(requests.get(f'{base_url}/getMahalle', params={'ilce_key': ilce['ilce_key']}, verify=False).json())
    sokak_response = requests.get(f'{base_url}/getSokak', params={'mahalle_key': mahalle['mahalle_key']}, verify=False).json()

    if sokak_response:
        sokak = random.choice(sokak_response)
    else:
        sokak = {'sokak_cadde_title':""}
    ihtiyac_title = random.choice(requests.get(f'{base_url}/getIhtiyac', verify=False).json())['ihtiyac_title']

    # Select randomly from site and apartment name arrays
    site_title = random.choice(site_names)
    apartman_title = random.choice(apartman_names)

    # Generate a random 10 digit phone number
    tel_number = str(random.randint(5050000000, 5409999999))
    add_info = ""

    post_url = 'https://localhost:3001'


    # POST random data to addInput endpoint
    requests.get(f'{post_url}/addInput', params={
        'il_title': sehir['sehir_title'],
        'ilce_title': ilce['ilce_title'],
        'mahalle_title': mahalle['mahalle_title'],
        'sokak_cadde_title': sokak['sokak_cadde_title'],
        'site_title': site_title,
        'apartman_title': apartman_title,
        'tel_number': tel_number,
        'ihtiyac_title': ihtiyac_title,
        'add_info': add_info
    }, verify=False)


for i in range(10):
    data_generator()
