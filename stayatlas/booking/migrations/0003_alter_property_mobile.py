# Generated by Django 5.1.5 on 2025-02-08 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0002_propertyimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='mobile',
            field=models.CharField(max_length=12),
        ),
    ]
