from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Payroll
from .serializers import PayrollSerializer

class PayrollViewSet(ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
