import os
import cairosvg
from pathlib import Path
# Create path
Path("./converted/").mkdir(parents=True, exist_ok=True)
# Convert all .svg's in the ./output folder to ./converted/ as .png
for file in os.listdir('./output'):
    name = file.split('.svg')[0]
    print('Converting ' + './output/' + name + '.svg' + ' -> ./converted/' + name + '.png')
    cairosvg.svg2png(url='./output/' + name + '.svg', write_to='./converted/' + name + '.png') 