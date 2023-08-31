from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import get_object_or_404
from shop.models import Member, Shop

HIERARCHY = {
    Member.ADMIN: [Member.MANAGER],
    Member.MANAGER: [Member.ADMIN, Member.MANAGER]
}


def shop_access(role=None):
    def wrapper(func):
        def check(view, request, shop_id, *args, **kwargs):
            shop = get_object_or_404(Shop, pk=shop_id)
            kwargs['shop'] = shop

            query = Member.objects.filter(shop=shop, user=request.user)
            query = query.filter(role__in=HIERARCHY.get(role, [])) if role else query

            if not query.exists():
                raise AuthenticationFailed({'detail': 'У вас нет прав на просмотр этого магазина!'})

            return func(view, request, *args, **kwargs)
        return check
    return wrapper
