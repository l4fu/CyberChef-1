#coding:utf-8


import requests
import random
import json
from hashlib import md5

# Set your own appid/appkey.
appid = '20220830001325323'
appkey = 'TyO0ILplwdjZrlpmQujV'


# For list of language codes, please refer to `https://api.fanyi.baidu.com/doc/21`
from_lang = 'en'
to_lang =  'zh'

endpoint = 'http://api.fanyi.baidu.com'
path = '/api/trans/vip/translate'
url = endpoint + path
url="https://fanyi-api.baidu.com/api/trans/vip/translate"

query = 'Hello World! This is 1st paragraph. This is 2nd paragraph.'

# Generate salt and sign
def make_md5(s, encoding='utf-8'):
    return md5(s.encode(encoding)).hexdigest()

salt = random.randint(32768, 65536)
sign = make_md5(appid + query + str(salt) + appkey)

# Build request
headers = {'Content-Type': 'application/x-www-form-urlencoded'}

def get_res(query):
    payload = {'appid': appid, 'q': query, 'from': from_lang, 'to': to_lang, 'salt': salt, 'sign': sign}

    # Send request
    r = requests.post(url, params=payload, headers=headers)
    result = r.json()
    print (result )
    res=json.dumps(result, indent=4, ensure_ascii=False)
    res=json.loads(res)
    # Show response
    print(res['trans_result'][0]['dst'])
