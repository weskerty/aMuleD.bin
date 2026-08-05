#!/data/data/com.termux/files/usr/bin/bash

BASE="$HOME/aMuTorrent"

echo -e "\e[1;31m┌─────────────────────────────────┐\e[0m"
echo -e "\e[1;31m│ aMuTorrent Uninstaller \e[1;31m│\e[0m"
echo -e "\e[1;31m└─────────────────────────────────┘\e[0m"
echo -e "\e[1;33mSe borraran los datos de $BASE en conf, incluyendo transmission, prowlarr, sonarr, radarr y aMule\e[0m"
echo -e "\e[1;33mAll data in $BASE will be deleted, including transmission, prowlarr, sonarr, radarr and aMule\e[0m"
read -p "Continuar / Continue? (si/yes): " CONFIRMA

if [ "$CONFIRMA" != "si" ] && [ "$CONFIRMA" != "yes" ]; then
  echo "Cancelado"
  exit 0
fi

echo "Adios"
sv-disable prowlarr transmission sonarr radarr 2>/dev/null
pkill runsv 2>/dev/null
pkill runsvdir 2>/dev/null
pkill -f transmission-daemon 2>/dev/null
pkill -f Prowlarr.dll 2>/dev/null
pkill -f Prowlarr 2>/dev/null
pkill -f Sonarr 2>/dev/null
pkill -f Radarr 2>/dev/null
pkill -f aMuleDARM64.bin 2>/dev/null
pkill -f aMuleDARMv7.bin 2>/dev/null
pkill -f "node server/server.js" 2>/dev/null
pkill -f proot 2>/dev/null
sleep 2

echo "Borrando carpeta $BASE"
rm -rf "$BASE"

echo "Desinstalando programas"
pkg uninstall -y prowlarr transmission sonarr radarr
#proot-distro remove debian

echo "Desinstalacion completa :l"