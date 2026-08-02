#!/data/data/com.termux/files/usr/bin/bash

BASE="$(cd "$(dirname "$0")" && pwd)"

echo "Deteniendo procesos previos"
sv-disable prowlarr transmission sonarr radarr 2>/dev/null
pkill runsv 2>/dev/null
pkill runsvdir 2>/dev/null
pkill -f transmission-daemon 2>/dev/null
pkill -f Prowlarr.dll 2>/dev/null
pkill -f Prowlarr 2>/dev/null
pkill -f Sonarr 2>/dev/null
pkill -f Radarr 2>/dev/null
pkill -f amuled 2>/dev/null
pkill -f "node server/server.js" 2>/dev/null
pkill -f proot 2>/dev/null
sleep 2

termux-wake-lock

echo "Actualizando aMuTorrent"
cd "$BASE"
git fetch origin
git reset --hard origin/master

cd "$BASE/repo"
git fetch origin
git reset --hard origin/main

echo "Actualizando mas duro"
cd "$BASE/repo/server"
npm install-scripts approve --all
if [ ! -f node_modules/better-sqlite3/build/Release/better_sqlite3.node ]; then
  echo "Compilando better-sqlite3 nativo"
  CXXFLAGS="-std=c++2a" npm install better-sqlite3@latest
  npm install-scripts approve --all
  CXXFLAGS="-std=c++2a" npm rebuild better-sqlite3
fi
CXXFLAGS="-std=c++2a" npm install
cd "$BASE/repo"
npm install-scripts approve --all
npm install
npm run build

echo "Actualizando actualizadores "
curl -s https://cf.trackerslist.com/all.txt -o "$BASE/conf/transmission/list1.txt"
curl -s https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt -o "$BASE/conf/transmission/list2.txt"
cat "$BASE/conf/transmission/list1.txt" "$BASE/conf/transmission/list2.txt" 2>/dev/null | grep -E "^(http|udp|wss)" | sort -u | awk 'BEGIN{ORS="\n\n"}{print}' > "$BASE/conf/transmission/trackers.txt"
if [ -s "$BASE/conf/transmission/trackers.txt" ]; then
  TRACKERS_JSON=$(jq -Rs . < "$BASE/conf/transmission/trackers.txt")
  jq --argjson t "$TRACKERS_JSON" '.["default-trackers"] = $t' "$BASE/conf/transmission/settings.json" > "$BASE/conf/transmission/settings.json.tmp" && mv "$BASE/conf/transmission/settings.json.tmp" "$BASE/conf/transmission/settings.json"
fi

echo "Iniciando Transmission"
nohup transmission-daemon --config-dir="$BASE/conf/transmission" > "$BASE/conf/transmission.log" 2>&1 &

echo "Iniciando Prowlarr"
nohup prowlarr --nobrowser --data="$BASE/conf/prowlarr" > "$BASE/conf/prowlarr.log" 2>&1 &

echo "Iniciando Sonarr"
nohup sonarr -nobrowser -data="$BASE/conf/sonarr" > "$BASE/conf/sonarr.log" 2>&1 &

echo "Iniciando Radarr"
nohup radarr -nobrowser -data="$BASE/conf/radarr" > "$BASE/conf/radarr.log" 2>&1 &

echo "Iniciando WebUI"
cd "$BASE/repo"
node server/server.js &

echo "Iniciando aMule"
nohup proot-distro login debian -- bash -c "cd '$BASE/conf/aMule' && chmod +x aMule.AppImage && ./aMule.AppImage --appimage-extract > /dev/null 2>&1 && ./squashfs-root/usr/bin/amuled --config-dir='$BASE/conf/aMule'" > "$BASE/conf/amule.log" 2>&1 &

echo -e "\e[1;36m┌─────────────────────────────────┐\e[0m"
echo -e "\e[1;36m│ \e[1;32m🚀 Abre localhost:4000 \e[1;36m│\e[0m"
echo -e "\e[1;36m└─────────────────────────────────┘\e[0m"
echo -e "\e[1;33m⚠️ LISTO INICIA la Web Control en localhost:4000 \e[0m"
echo -e "\e[1;33m⚠️ o desde otro dispositivo en: http://$(ip route get 1 | awk '{print $7; exit}'):4000\e[0m"