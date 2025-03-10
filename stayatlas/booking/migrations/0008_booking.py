# Generated by Django 5.1.5 on 2025-03-06 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0007_alter_property_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=100)),
                ('check_in', models.DateField()),
                ('check_out', models.DateField()),
                ('adults', models.PositiveIntegerField()),
                ('children', models.PositiveIntegerField()),
                ('rooms', models.PositiveIntegerField()),
            ],
        ),
    ]
