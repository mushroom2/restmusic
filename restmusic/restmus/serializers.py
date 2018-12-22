from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Track


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]

            )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class TrackSerializer(serializers.ModelSerializer):
    track_name = serializers.CharField(max_length=1024, required=True)
    track_id = serializers.IntegerField(required=True,
                                        validators=[UniqueValidator(queryset=Track.objects.all())])
    added = serializers.DateTimeField(required=False)
    path = serializers.CharField(max_length=1500, required=True)

    def create(self, validated_data):
        track = Track.objects.create(track_name=validated_data['track_name'],
                                     track_id=validated_data['track_id'],
                                     path=validated_data['path'])

        return track

    class Meta:
        model = Track
        fields = ('track_name', 'track_id', 'added', 'path')

