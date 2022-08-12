from todo.models import Expens
from todo.serializers.expens import ExpensSerializer, ExpensFilterSerializer
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class ExpensListView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        params = ExpensFilterSerializer.check(request.GET)
        queryset = Expens.objects.list(todo=params.get('todo'))
        serializer = ExpensSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExpensSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class ExpensDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Expens, id=pk)
        data = ExpensDetailSerializer(instance).data
        return Response(data)

    def delete(self, request, pk):
        instance = get_object_or_404(Expens, id=pk)
        instance.delete()
        return Response({}, 204)

    def put(self, request, pk):
        instance = get_object_or_404(Expens, id=pk)
        serializer = ExpensSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
