#!/data/data/com.termux/files/usr/bin/bash

BASE="$(cd "$(dirname "$0")" && pwd)"

termux-wake-lock

echo "Actualizando aMuTorrent"
cd "$BASE"
git fetch origin
git reset --hard origin/master

echo "Actualizando WebUI"
cd "$BASE/repo"
git fetch origin
git reset --hard origin/master

echo "Instalando dependencias WebUI"
cd "$BASE/repo/server"
npm install-scripts approve --all
CXXFLAGS="-std=c++2a" npm install
cd "$BASE/repo"
npm install-scripts approve --all
npm install
npm run build

echo "Iniciando Transmission"
nohup transmission-daemon --config-dir="$BASE/conf/transmission" > "$BASE/conf/transmission.log" 2>&1 &

echo "Iniciando Prowlarr"
nohup prowlarr --nobrowser --data="$BASE/conf/prowlarr" > "$BASE/conf/prowlarr.log" 2>&1 &

#echo "Iniciando Sonarr"
#nohup sonarr -nobrowser -data="$BASE/conf/sonarr" > "$BASE/conf/sonarr.log" 2>&1 &

#echo "Iniciando Radarr"
#nohup radarr -nobrowser -data="$BASE/conf/radarr" > "$BASE/conf/radarr.log" 2>&1 &

echo "Iniciando WebUI"
cd "$BASE/repo"
node server/server.js &

echo "Iniciando aMule"
nohup proot-distro login debian -- bash -c "cd '$BASE/conf/aMule' && chmod +x aMule.AppImage && ./aMule.AppImage --appimage-extract > /dev/null 2>&1 && ./squashfs-root/usr/bin/amuled --config-dir='$BASE/conf/aMule'" > "$BASE/conf/amule.log" 2>&1 &

echo "Todo iniciado"
