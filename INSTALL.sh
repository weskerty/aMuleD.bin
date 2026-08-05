#!/data/data/com.termux/files/usr/bin/bash

T="👉✅ Concede los Permisos"
T1="ACCEPT PERMISSIONS WHEN PROMPTED"

echo -e "\e[1;36m┌─────────────────────────────────┐\e[0m"
echo -e "\e[1;36m│ \e[1;32m🚀 aMuTorrent Installer \e[1;36m│\e[0m"
echo -e "\e[1;36m└─────────────────────────────────┘\e[0m"
echo -e "\e[1;33m⚠️ ACEPTA LOS PERMISOS CUANDO APAREZCAN | ACCEPT PERMISSIONS WHEN THEY APPEAR \e[0m"
echo -e "\e[1;33m⚠️ CONCEDE PERMISOS DE ALMACENAMIENTO Y EJECUCION | GRANT STORAGE AND EXECUTION PERMISSIONS \e[0m"
sleep 5

clear
printf "\033[33m%s\033[0m \033[31m%s\033[0m\n" "$T1" "$T"
sleep 1
clear
printf "\033[31m%s\033[0m \033[33m%s\033[0m\n" "$T1" "$T"
sleep 1
clear
printf "\033[33m%s\033[0m \033[31m%s\033[0m\n" "$T1" "$T"
sleep 1
clear
printf "\033[31m%s\033[0m \033[33m%s\033[0m\n" "$T1" "$T"


sleep 2
printf 'y\y' | termux-setup-storage
sleep 10
termux-wake-lock
pkg update 
pkg install -y tur-repo x11-repo
pkg update







echo "Actualizando paquetes"
pkg update -y
yes | apt upgrade
pkg install -y git jq wget nodejs-lts 
pkg install -y clang lld libc++ 
pkg install -y python3
pkg install -y prowlarr
pkg install -y transmission
pkg install -y sonarr
pkg install -y radarr
pkg install -y caddy

echo "Configurando node-gyp vacio"
mkdir -p ~/.gyp
cat > ~/.gyp/include.gypi << 'EOF'
{
	'variables': {
		'android_ndk_path': ''
	}
}
EOF

cd ~
git clone --depth 1 https://github.com/weskerty/aMuleD.bin.git aMuTorrent

git clone --depth 1 https://github.com/got3nks/amutorrent.git aMuTorrent/repo

mkdir -p aMuTorrent/conf/amutorrent
mkdir -p aMuTorrent/conf/amutorrent-logs
mkdir -p aMuTorrent/conf/amutorrent/geoip
cd aMuTorrent/repo/server
ln -s ../../conf/amutorrent data
ln -s ../../conf/amutorrent-logs logs
ln -s ../../conf/amutorrent/geoip geoip
cd ~/aMuTorrent

chmod +x START.sh
chmod +x bin/aMule/aMuleDARM64.bin bin/aMule/aMuleDARMv7.bin

./START.sh