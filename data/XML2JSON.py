import json, xmljson, sys
from lxml.etree import fromstring, tostring

with open(sys.argv[1], 'r') as file:
    data = file.read().replace('\n', '')
xml = fromstring(data)
print json.dumps(xmljson.parker.data(xml), indent=4, sort_keys=True)
