import hashlib
import json

import requests
from django.conf import settings

from core.models import SmsToken


def send_sms(text, phone):
    if not (settings.ESKIZ_EMAIL and settings.ESKIZ_PASSWORD) or settings.TESTING:
        return

    phone = str(phone)
    # if phone.startswith(('+998', '998')):
    #     send_sms_eskiz(text, phone)
    # else:
    send_sms_epochta(text, phone)


def send_sms_eskiz(text, phone):
    url = 'http://notify.eskiz.uz/api/message/sms/send'
    data = json.dumps({'mobile_phone': phone, 'message': text})

    sms_token = SmsToken.objects.filter(is_active=True).first()

    headers = {
        'Authorization': f'Bearer {sms_token.token}',
        'Content-Type': 'application/json',
    }

    response = requests.post(headers=headers, url=url, data=data).json()

    if response.get('message') == "Token has expired":
        sms_token.is_active = False
        sms_token.save()

        auth_response = requests.post(
            'http://notify.eskiz.uz/api/auth/login',
            data={
                'email': settings.ESKIZ_EMAIL,
                'password': settings.ESKIZ_PASSWORD
            }
        ).json()

        new_token = auth_response.get('data', {}).get('token', '')

        if new_token:
            SmsToken.objects.create(token=new_token, is_active=True)

        send_sms_eskiz(text, phone)


def send_sms_epochta(text, phone):
    public_key = '0959c285b8e394bb1ea212ce61b08f3c'
    private_key = '50bd8dc3ca2d684723345265b00ef5c8'

    def calc_control_sum(_params):
        _params['key'] = public_key
        _params['version'] = '3.0'
        _params['action'] = 'sendSMS'

        control_str = ''
        for key in sorted(_params):
            control_str += _params[key]

        control_str += private_key

        return hashlib.md5(control_str.encode('utf-8')).hexdigest()

    url = 'http://api.atompark.com/api/sms/3.0/sendSMS'
    _data = {
        'sender': 'Info',
        'text': text,
        'phone': phone,
        'datetime': '',
        'sms_lifetime': '0'
    }
    control_sum = calc_control_sum(_data)

    data = {
        'key': public_key,
        'sum': control_sum,
        'sender': _data['sender'],
        'text': text,
        'phone': phone,
        'datetime': _data['datetime'],
        'sms_lifetime': _data['sms_lifetime']
    }

    requests.post(url=url, data=data).json()
