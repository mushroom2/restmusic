# Generated by Django 2.0 on 2018-12-15 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restmus', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='track_id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
    ]