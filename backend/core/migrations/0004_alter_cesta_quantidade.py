# Generated by Django 5.1.6 on 2025-06-24 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_cesta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cesta',
            name='quantidade',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
