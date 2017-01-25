import sys, os
from subprocess import call

def thumb(path, height):
    dirname = os.path.dirname(path)
    filename = os.path.basename(path)
    path = os.path.join(path)
    path_tn = os.path.join(dirname,
        filename.split('.')[0]+'_tn.jpg')
    call(['convert', path, '-resize', str(height), path_tn])
    return path_tn

def gray(path):
    dirname = os.path.dirname(path)
    filename = os.path.basename(path)
    call(['convert',
        path,
        '-grayscale',
        'rec709luma',
        os.path.join(dirname,
            filename.split('.')[0]+'_gray.jpg')
        ])

def process(path):
    path_tn = thumb(path, 500)
    gray(path)
    gray(path_tn)

def process_files():
    for dirname, dirnames, filenames in os.walk('img'):
        for filename in filenames:
            if '.jpg' in filename:
                path = os.path.join(dirname, filename)
                process(path)

### main

process_files()