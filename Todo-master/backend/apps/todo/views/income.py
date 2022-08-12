from todo.models import Income
from todo.serializers.income import IncomeSerializer, IncomeFilterSerializer
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class IncomeListView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        params = IncomeFilterSerializer.check(request.GET)
        queryset = Income.objects.list(todo=params.get('todo'))
        serializer = IncomeSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IncomeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class IncomeDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Income, id=pk)
        data = IncomeDetailSerializer(instance).data
        return Response(data)

    def delete(self, request, pk):
        instance = get_object_or_404(Income, id=pk)
        instance.delete()
        return Response({}, 204)

    def put(self, request, pk):
        instance = get_object_or_404(Income, id=pk)
        serializer = IncomeSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
