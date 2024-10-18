from flask import Flask, request
from flask_cors import CORS
import requests
import os

allowed_domains = [os.getenv('CLIENT_URL')]

app = Flask(__name__)
cors = CORS(app, origins=allowed_domains)

app.secret_key = "secret"

@app.route('/')
def nothing():
    return {'stat': 'WOrking fine'}

@app.route('/getroll', methods=['GET'])
def getRollNo():
    url = request.args.get('url')
    cook = {'_zldp': 'rafdzIl5i004tTL%2B7ZqTx3yNharrrWCY8tSPlqtJAUhzb8a147PdymsgsF%2FUZIXikygWa1To3IM%3D'}
    header = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.rajalakshmi.org',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Brave";v="120"',
        'Cache-Control': 'max-age=0',
        'Cookie': 'rajalakshmiengineering-_zldp=rafdzIl5i004tTL%2B7ZqTx3yNharrrWCY8tSPlqtJAUhzb8a147PdymsgsF%2FUZIXikygWa1To3IM%3D',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': "Windows",
        'Sec-Fetch-Dest': "document",
        'Sec-Fetch-Mode': "navigate",
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Sec-Gpc': '1',
        'Referer': 'www.rajalakshmi.org',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }

    try:    
        getPhoto = 'https://www.rajalakshmi.org/QRCode/RECnimg/' + request.args.get('url')[request.args.get('url').find('=')+1:] + '.jpg'
        response = requests.post(
                url,
                cookies=cook,
                headers=header,
                verify=False,
            )

        data = response.text
        return {
            'stat': '200',
            'rollno': data[data.find("<b>Reg No:</b>") + 14: data.find("<b>Reg No:</b>") + 24].strip(),
            'name': data[data.find('<tr><td>&nbsp;<b>') + 17:data.find('</b></td></tr>')],
            # 'data': data,
            'd': getPhoto
        }
    except Exception as e:
        return {
            'stat': '0',
            'rollno': 'Not found',
        }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)