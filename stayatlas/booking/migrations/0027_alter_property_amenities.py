# Generated by Django 5.1.5 on 2025-03-26 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0026_remove_property_amenities_property_amenities'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='amenities',
            field=models.ManyToManyField(blank=True, to='booking.amenity'),
        ),
    ]
