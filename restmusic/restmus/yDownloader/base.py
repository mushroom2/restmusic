from pytube import YouTube
from subprocess import Popen, PIPE
import os
import re
from datetime import datetime

def name_format(name):
    return re.sub(r'[/.:]+', '', name)


def download_from_youtuve(url):
    bp = os.path.split(__file__)[0]
    try:
        yt = YouTube(url)
        songname = name_format(yt.title)
        fformat = f'.{yt.streams.first().subtype}'
        yt.streams.first().download(output_path=bp)
    except Exception as e:
        res = {
            'status': 'not ok',
            'timestamp': datetime.now(),
            'err': f'Problems with PyTube {str(e)}'
        }
        return res

    # todo add provide django logger
    print('downloaded')
    downloaded_p = os.path.join(bp, '{sname}'.format(sname=songname))
    scripts = {
        '.mp4': 'mp4tomp3.sh',
        '.webm': 'webmtomp3.sh'
    }

    # if video not exists return err
    if not os.path.isfile(downloaded_p + fformat):
        res = {
            'status': 'not ok',
            'timestamp': datetime.now(),
            'err': "Target video downloaded, but not found"
        }
        return res

    # run bash scrip to convert mp4 to mp3
    script_p = os.path.join(bp, scripts[fformat])
    sub = Popen([f'{script_p} "{downloaded_p}"'], shell=True, stdout=PIPE)
    sub.communicate()

    # remove downloaded video
    os.remove(downloaded_p + fformat)
    res = {
        'status': 'ok',
        'songname': songname,
        'hash': hash(songname),
        'timestamp': datetime.now(),
        'path': '/static/' + songname + '.mp3',
        'err': None
    }
    return res


if __name__ == '__main__':
    download_from_youtuve('https://www.youtube.com/watch?v=kFr8SdOS5ic')