#################
### IMPORTANT ###
#################
#
# This script must be run inside the `examples` directory
# of the main Flix repository.
#
# It simply prints all the paths in the `examples` directory
# and prints them as json objects that can be inserted into `sampleFiles.mjs`
# file in this repository.
#
# Use as `python3 print-all-examples.py > out.json`
#

import os

def json_kv(key: str, val: str) -> str:
    result = key
    result += ': '
    result += "'"
    result += val
    result += "',\n"
    return result

def to_json(str: str) -> str:
    result =  '  {\n'
    result += '    '
    result += json_kv('name', str)
    result += '    '
    result += json_kv('file', str)
    result += '  },'
    return result

paths = []
for dirpath, _, files in os.walk('.'):
    for file_name in files:
        path = os.path.join(dirpath, file_name)
        if path.endswith('.flix'):
            paths.append(path.removeprefix('./'))

json_objects = []
for path in sorted(paths):
    json_objects.append(to_json(path))

result = ',\n'.join(json_objects)
print(result)
