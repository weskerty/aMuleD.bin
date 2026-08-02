#!/data/data/com.termux/files/usr/bin/bash

echo "Solicitando permisos"
termux-wake-lock
printf 'y\n' | termux-setup-storage
sleep 3

echo "Agregando repos"
pkg install -y tur-repo x11-repo

echo "Actualizando paquetes"
apt update -y
yes | apt upgrade
pkg install -y git proot-distro wget nodejs-lts clang lld libc++
pkg install -y prowlarr
pkg install -y transmission
pkg install -y sonarr
pkg install -y radarr
pkg install -y caddy

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
cd aMuTorrent/repo/server
ln -s ../../conf/amutorrent data
ln -s ../../conf/amutorrent-logs logs
cd ~/aMuTorrent

echo "Dando permisos"
chmod +x START.sh

echo "Instalacion completa"
./START.sh
