import requests
from django.core.management.base import BaseCommand

from todo.models import Todo


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        response = requests.get('https://www.kattabozor.uz/hh/test/api/v1/offers')

        if response.status_code == 200:
            data = response.json()
            print(data)
            for item in data['offers']:
                product = Todo(
                    name=item.get('name'),
                    brand=item.get('brand'),
                    category=item.get('category'),
                    merchant=item.get('merchant'),
                    attributes=item.get('attributes'),
                    image_url=item.get('image').get('url'),
                    image_width=item.get('image').get('width'),
                    image_height=item.get('image').get('height')
                )
                product.save()
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data from the API.'))
