
"""
这个脚本用于批量修改文件内容，比如批量修改文件中的链接，每次仅可以修改一处内容
"""
import os
import re
import sys
import requests
import random
import json
from hashlib import md5
import time

# Set your own appid/appkey.
appid = '20220830001325321'
appkey = 'TyO0ILplwdjZrlpmQujv'


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

def get_res(query):
    salt = random.randint(32768, 65536)
    sign = make_md5(appid + query + str(salt) + appkey)
    # Build request
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    payload = {'appid': appid, 'q': query, 'from': from_lang, 'to': to_lang, 'salt': salt, 'sign': sign}

    # Send request
    r = requests.post(url, params=payload, headers=headers)
    result = r.json()
    # print (result )
    res=json.dumps(result, indent=4, ensure_ascii=False)
    res=json.loads(res)
    # Show response
    print (res)
    return res['trans_result'][0]['dst']

#        以上是翻译用的

# mark_url = u"C:/Users/meng-/Desktop/operations"
mark_url=u"../core/operations"
modify_it="this\.description.=.\""
par = re.compile(modify_it)
modify_list = []  # 可修改文件名的列表
file_list = os.listdir(mark_url)  # 待修改文件夹
# print("修改前：\n" + str(file_list))  # 输出文件夹中包含的文件
current_path = os.getcwd()  # 得到进程当前工作目录
os.chdir(mark_url)  # 将当前工作目录修改为待修改文件夹的位置
filenams ="../cha1236.txt"
for filename in file_list:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        print (filename)
        res=re.findall("this.description.=.\"(.*?)\"",content)[0]
        xx= get_res(res)
        # print (filename,res,xx)
        time.sleep(1)
        with open(filenams,"w+") as b:
            b.write(filename+"-+-"+res[:70])
    with open(filename, 'w', encoding='utf-8') as f:
        # # 查看文件是否相匹配
        # if modify_it in content:
        #     modify_list.append(filename)
        # else:    
            # 替换文件内容 为 翻译后的内容
            lo='this.description = \"{}'.format(xx).replace("\\", "\\ ")
            print(lo)
            file = par.sub(lo, content)
            f.write(file)

# if modify_list:
#     print('可修改的文件名为：\n', modify_list)
#     print('修改完毕！')
# else:
#     print('没有可以修改的文件！')

os.chdir(current_path)  # 改回程序运行前的工作目录
sys.stdin.flush()  # 刷新
