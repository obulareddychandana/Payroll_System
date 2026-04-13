from django.db import models
from decimal import Decimal
from employees.models import Employee

class Payroll(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)

    month = models.CharField(max_length=20)
    year = models.IntegerField()

    total_working_days = models.IntegerField()
    present_days = models.IntegerField()

    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    hra = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    pf = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        daily_salary = self.basic_salary / Decimal(self.total_working_days)
        earned_salary = daily_salary * Decimal(self.present_days)

        self.hra = earned_salary * Decimal('0.20')
        self.pf = earned_salary * Decimal('0.12')
        self.tax = earned_salary * Decimal('0.10')

        self.net_salary = earned_salary + self.hra - self.pf - self.tax

        super().save(*args, **kwargs)

        def __str__(self):
            return f"{self.employee.name} - {self.month}"
        
    class Meta:
        db_table='payroll'
