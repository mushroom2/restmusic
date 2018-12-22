from django.db import models


class Track(models.Model):
    track_name = models.CharField(max_length=1024)
    track_id = models.BigIntegerField(primary_key=True)
    added = models.DateTimeField(auto_now=True)
    path = models.CharField(max_length=1500)
