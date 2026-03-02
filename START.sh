#!/bin/bash

cd repo
git fetch origin
git reset --hard origin/master

chmod -R +x Util/aMuleD.AppImage/

detect_arch() {
  case "$(uname -m)" in
    aarch64|arm64) echo "arm64" ;;
    armv7*) echo "armv7" ;;
    *) echo "x64" ;;
  esac
}

detect_os() {
  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || -n "$WINDIR" ]]; then
    echo "win"
  else
    echo "linux"
  fi
}

OS=$(detect_os)
ARCH=$(detect_arch)

if [[ "$OS" == "win" ]]; then
  case "$(echo $PROCESSOR_ARCHITECTURE | tr '[:upper:]' '[:lower:]')" in
    arm64) ARCH="arm64" ;;
    *) ARCH="x64" ;;
  esac
  BIN="Util/aMuleD.AppImage/amuled-${ARCH}.exe"
else
  BIN="Util/aMuleD.AppImage/amuled-${ARCH}.AppImage"
fi

FLAGS="--full-daemon --config-dir=.aMule"

run_fallback() {
  local bin="$1"
  local extract_dir="../home/amuled"
  mkdir -p "$extract_dir"
  "$bin" --appimage-extract-and-run $FLAGS 2>/dev/null || \
  (cd "$extract_dir" && "$OLDPWD/$bin" --appimage-extract && ./squashfs-root/usr/bin/amuled $FLAGS &)
}

if [[ "$OS" == "win" ]]; then
  "$BIN" $FLAGS || { echo "Error $BIN"; exit 1; }
else
  "$BIN" $FLAGS || run_fallback "$BIN"
fi

cd MuLy || { echo "No MuLy Path"; exit 1; }

VOLTA_NPM="/opt/aMuleD.bin/home/.volta/bin/npm"

if [[ -x "$VOLTA_NPM" ]]; then
  "$VOLTA_NPM" install --force && node server.js
elif command -v volta &>/dev/null; then
  volta run npm install --force && node server.js
else
  npm install --force && node server.js
fi
