import os
import cairosvg

for file in os.listdir('./output'):
    name = file.split('.svg')[0]
    print('Converting ' + './output/' + name + '.svg' + ' -> ./converted/' + name + '.png')
    cairosvg.svg2png(url='./output/' + name + '.svg', write_to='./converted/' + name + '.png') 