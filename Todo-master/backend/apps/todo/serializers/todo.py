from rest_framework import serializers

from todo.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id',
                  'name',
                  'brand',
                  'category',
                  'merchant',
                  'attributes',
                  'image_url',
                  'image_width',
                  'image_height',
                  )
