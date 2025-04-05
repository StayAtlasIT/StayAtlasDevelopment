# Generated by Django 5.1.5 on 2025-03-20 13:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0018_alter_amenity_name_alter_property_amenities_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(10000), django.core.validators.MaxValueValidator(500000)]),
        ),
    ]
