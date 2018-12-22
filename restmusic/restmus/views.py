from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .yDownloader.base import download_from_youtuve
from .serializers import UserSerializer, TrackSerializer
from .models import Track
from django.contrib.auth.models import User


class UserCreate(APIView):
    """
    Creates the user.
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                resp = serializer.data
                resp['token'] = token.key
                return Response(resp, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrackCreate(APIView):
    def post(self, request, format='json'):
        url = request.data['url']
        res = download_from_youtuve(url)
        # todo add error responses
        if res['status'] == 'ok':

            serializer = TrackSerializer(data={
                'track_name': res['songname'],
                'track_id': res['hash'],
                'path': res['path']
            })
            if serializer.is_valid():
                track = serializer.save()
                if track:
                    resp = serializer.data
                    return Response(resp, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format='json'):
        traks = Track.objects.all()
        serializer = TrackSerializer(traks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


