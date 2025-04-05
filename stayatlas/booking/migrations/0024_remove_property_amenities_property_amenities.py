# Generated by Django 5.1.5 on 2025-03-25 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0023_remove_property_custom_amenities_amenity_emoji_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='amenities',
        ),
        migrations.AddField(
            model_name='property',
            name='amenities',
            field=models.TextField(default=7, help_text='Comma-separated list of amenities'),
            preserve_default=False,
        ),
    ]
