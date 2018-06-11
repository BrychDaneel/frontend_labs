from django.shortcuts import render
from django.views.generic.edit import CreateView
from app.models import People
from django.http import JsonResponse
from django.core import serializers

def main(request):
    return render(request, 'main.html')

class PeopleAdd(CreateView):
    model = People
    fields = '__all__'
    template_name = 'add_people.html'

def people_list(request):
    lst = [
        {
            'name' : p.name,
            'age' : p.age,
            'weight' : p.weight,
            'height' : p.height,
            'habits' : p.habits,
            'sex' : p.sex,
        }
        for p in People.objects.all() 
    ]
    return JsonResponse(lst, safe=False)
