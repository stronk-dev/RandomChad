Dependencies:
npm install
pip3 install cairosvg
pacman -Sy cairo python3 python-pip

Generate:
npm run dev or npm run start
python3 convert.py

Install:
rm -rf /var/www/avatars/*
mv converted/*.png /var/www/avatars