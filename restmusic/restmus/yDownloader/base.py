from pytube import YouTube
from subprocess import Popen, PIPE
import os
import re
from datetime import datetime

def name_format(name):
    return re.sub(r'[/]+', '', name)


def download_from_youtuve(url):
    bp = os.path.split(__file__)[0]
    try:
        yt = YouTube(url)
        songname = name_format(yt.title)
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

    # if video not exists return err
    if not os.path.isfile(downloaded_p + '.mp4'):
        res = {
            'status': 'not ok',
            'timestamp': datetime.now(),
            'err': "Target video downloaded, but not found"
        }
        return res

    # run bash scrip to convert mp4 to mp3
    script_p = os.path.join(bp, 'mp4tomp3.sh')
    sub = Popen([f'{script_p} "{downloaded_p}"'], shell=True, stdout=PIPE)
    sub.communicate()

    # remove downloaded video
    os.remove(downloaded_p + '.mp4')
    res = {
        'status': 'ok',
        'songname': songname,
        'hash': hash(songname),
        'timestamp': datetime.now(),
        'path': downloaded_p + '.mp3',
        'err': None
    }
    return res


if __name__ == '__main__':
    download_from_youtuve('https://www.youtube.com/watch?v=kFr8SdOS5ic')