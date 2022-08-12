from django.db.models import Q

from core.querysets.base_queryset import BaseQuerySet


class ExpensQuerySet(BaseQuerySet):
    def list(self, todo=None):
        query = self.filter(todo=todo) if todo else self
        return query
