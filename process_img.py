import sys, os
from pprint import pprint
from subprocess import call
from multiprocessing.pool import ThreadPool as Pool
import exifread

def thumb(path, height):
    dirname = os.path.dirname(path)
    filename = os.path.basename(path)
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

def process(dirname, filename):
    if '.jpg' in filename:
        path = os.path.join(dirname, filename)
        if 'film' in dirname:
            with open(path, 'rb') as img_f:
                exiftags = exifread.process_file(img_f)
                timestamp = str(exiftags['Image DateTime']).replace(':', '-')
                os.rename(path, os.path.join(dirname, '%s.jpg' % timestamp))

        path_tn = thumb(path, 500)
        p.map(gray, [path, path_tn])

def process_files():
    for dirname, dirnames, filenames in os.walk('img'):
        map(lambda filename: process(dirname, filename), filenames)

if __name__ == '__main__':
    p = Pool(32)
    process_files()
