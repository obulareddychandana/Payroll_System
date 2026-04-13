from rest_framework import serializers
from .models import Payroll
class PayrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = '__all__'
        read_only_fields = ['hra', 'pf', 'tax', 'net_salary', 'created_at']