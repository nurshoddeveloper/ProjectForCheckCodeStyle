from todo.models import Project
from todo.serializers.project import ProjectSerializer
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView


class ProjectListView(APIView):
    def get(self, request):
        queryset = Project.objects.all()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class ProjectDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Project, id=pk)
        data = ProjectSerializer(instance).data
        return Response(data)

    def delete(self, request, pk):
        instance = get_object_or_404(Project, id=pk)
        instance.delete()
        return Response({}, 204)

    def put(self, request, pk):
        instance = get_object_or_404(Project, id=pk)
        serializer = ProjectSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
