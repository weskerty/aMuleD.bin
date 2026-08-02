#!/data/data/com.termux/files/usr/bin/bash

echo -e "\e[1;36m┌─────────────────────────────────┐\e[0m"
echo -e "\e[1;36m│ \e[1;32m🚀 aMuTorrent Installer \e[1;36m│\e[0m"
echo -e "\e[1;36m└─────────────────────────────────┘\e[0m"
echo -e "\e[1;33m⚠️ ACEPTA LOS PERMISOS CUANDO APAREZCAN | ACCEPT PERMISSIONS WHEN THEY APPEAR \e[0m"
echo -e "\e[1;33m⚠️ CONCEDE PERMISOS DE ALMACENAMIENTO Y EJECUCION | GRANT STORAGE AND EXECUTION PERMISSIONS \e[0m"
sleep 5
echo -e "\e[1;32m🔧 Solicitando Permisos... | Requesting Permissions...\e[0m"
sleep 2
printf 'y\y' | termux-setup-storage
sleep 10
termux-wake-lock
apt-get update 
pkg install -y tur-repo x11-repo
apt-get update

pkg install -y tur-repo x11-repo

echo "Actualizando paquetes"
apt update -y
yes | apt upgrade
pkg install -y git jq proot-distro wget nodejs-lts clang lld libc++
pkg install -y prowlarr
pkg install -y transmission
pkg install -y sonarr
pkg install -y radarr
pkg install -y caddy

echo "Configurando node-gyp para Termux"
mkdir -p ~/.gyp
cat > ~/.gyp/include.gypi << 'EOF'
{
	'variables': {
		'android_ndk_path': ''
	}
}
EOF

echo "Instalando Debian en proot-distro"
proot-distro install debian

echo "Clonando aMuTorrent"
cd ~
git clone --depth 1 https://github.com/weskerty/aMuleD.bin.git aMuTorrent

echo "Clonando WebUI"
git clone --depth 1 https://github.com/got3nks/amutorrent.git aMuTorrent/repo

echo "Creando symlinks"
mkdir -p aMuTorrent/conf/amutorrent
mkdir -p aMuTorrent/conf/amutorrent-logs
mkdir -p aMuTorrent/conf/amutorrent/geoip
cd aMuTorrent/repo/server
ln -s ../../conf/amutorrent data
ln -s ../../conf/amutorrent-logs logs
ln -s ../../conf/amutorrent/geoip geoip
cd ~/aMuTorrent

echo "Dando permisos"
chmod +x START.sh

echo "Instalacion completa"
./START.sh