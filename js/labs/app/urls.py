from django.urls import include, path
from django.views.generic.base import TemplateView
from django.conf.urls.static import static

from app.views import main
from app.views import people_list
from app.views import PeopleAdd

urlpatterns = [
    path('', main),
    path('peoples/list', people_list),
    path('peoples/add', PeopleAdd.as_view()),
]
