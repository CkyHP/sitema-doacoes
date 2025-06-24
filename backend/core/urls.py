from .views import DoadorViewSet, AlimentoViewSet, DoacaoViewSet, DoadorLoginView, CestaViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'doador', DoadorViewSet)
router.register(r'alimento', AlimentoViewSet)
router.register(r'doacao', DoacaoViewSet)
router.register(r'cesta', CestaViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('doador/login/', DoadorLoginView.as_view(), name='doador-login'),
]