import sys, os
from subprocess import call
from multiprocessing.pool import ThreadPool as Pool

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

def process(dirname, filename):
    if '.jpg' in filename:
        path = os.path.join(dirname, filename)
        path_tn = thumb(path, 500)
        p.map(gray, [path, path_tn])

def process_files():
    for dirname, dirnames, filenames in os.walk('img'):
        p.map(lambda filename: process(dirname, filename), filenames)

if __name__ == '__main__':
    p = Pool(32)
    process_files()