<h3> </h3>
<div style="text-align:center;"
<p align="center">
<img src="https://github.com/user-attachments/assets/429ef5bd-8b16-4327-8217-6873ad55b33c" alt="Muly" width="170">



<h1>aMuTorrent on Termux</h1> 
P2P Suite in Your Pocket

  <table>
    <tr>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/home-mobile.png" /></td>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/downloads-mobile.png" /></td>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/history-mobile.png" /></td>
    </tr>
  </table>

</br>

# Minimal Resource Consumption

<table>
  <tr>
    <td><img width="400" src="https://github.com/user-attachments/assets/87f61c2a-8327-4ecc-885b-8310efce5a91"></td>
    <td><img width="400" src="https://github.com/user-attachments/assets/c0b6cbb6-c079-452b-a630-544151c69123"></td>
  </tr>
  <tr>
    <td>Termux A16</td>
    <td>RN8 + OTG</td>
  </tr>
</table>

Power consumption is Minimal, less than a light bulb. Even lower without a hard drive. You can Reuse Old Android Devices (From Android 5). Let's take care of the World that God gave us ❤️

</div>

<details> <summary> 🛂 Explanation - What does this do?</summary>
The system uses Transmission for torrents and eMule (KAD&ED2K P2P), watch-dir set to PhoneStorage/Downloads/aMuTorrent. All files in this path will be seeded. From the WebUI you can search, download and view all the information about torrents. 

</details>



## Installation

### Android

Download and Install Termux from here: 

<!--
<a href="https://github.com/termux/termux-app/releases/download/v0.119.0-beta.3/termux-app_v0.119.0-beta.3+apt-android-7-github-debug_universal.apk">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=plastic&logo=android&logoColor=white" alt="Descargar Termux" width="90">
</a>
-->

[Android 7 and higher ↗️](https://github.com/termux/termux-app/releases/download/v0.119.0-beta.3/termux-app_v0.119.0-beta.3+apt-android-7-github-debug_universal.apk) 

or

[For Android 5&6 Here ↗️](https://github.com/termux/termux-app/releases/download/v0.119.0-beta.3/termux-app_v0.119.0-beta.3+apt-android-5-github-debug_universal.apk)


### Once installed, paste this into Termux:
```
curl -fsSL https://raw.githubusercontent.com/weskerty/aMuleD.bin/refs/heads/master/INSTALL.sh | bash
```

Questions will appear asking "Allow Access to All Files" and "Allow Background Execution without Battery Restrictions?" and in both cases select YES.

After a while the Service will be ready, you will see a message saying "Start in Browser".

Go to [http://localhost:4000 ↗️](http://localhost:4000) to control it or from another device using the local IP address of the Server Phone.

Downloads appear in Downloads/aMuTorrent/

## User:

```
admin
```

## Password

```
1234567890-p
```

To configure [Radarr ↗️](https://radarr.video/), [Sonarr ↗️](https://sonarr.tv/) and [Prowlarr ↗️](https://prowlarr.com/docs/api/) access them through their respective ports.

### External Storage - USB OTG Hard Drives

There are various storage methods:

* Symbolic Link to MicroSD (Many phones support up to 2TB SD cards)
* Symbolic Link to OTG Hard Drive (depending on the ROM, many do not put the hard drive to sleep when not in use, root is required for configuration.)
* SFTP with other machines
* NFS with other machines (requires root)

# Termux Google Play Store

<img width="1000" height="266" alt="zzzgoogle" src="https://github.com/user-attachments/assets/abf89ae6-bf50-43de-b20a-c257a5d1f19e" />

The version found on the Play Store does not work properly, the service will run, but it will not work with: [Radarr](https://radarr.video/), [Sonarr](https://sonarr.tv/) or [Prowlarr](https://prowlarr.com/docs/api/). Only the [aMule Search](https://amule-org.github.io/docs) and direct downloads from [Transmission](https://transmissionbt.com/) will work.

# Access Outside the Local Network

For this, you must enable Port Forwarding on your Router and I would also recommend changing the manager password, as well as the passwords of the other services mentioned above, since they all use the same password.

# Auto Start - Reopen

Restarting:

Enter Termux and paste:

```
cd aMuTorrent && bash START.sh
```

Startup can be automated with TermuxBoot/Tasker and a .bashrc or sv that automatically starts the command above

> [!IMPORTANT]
> ## Not Working?

In newer Android versions (A12 and above), the system does not allow Termux to stay alive in the background.

To solve this, you need to perform some extra steps to fix it.

* Phone Settings > Battery > Give Termux priority in everything, automatic startup, background operation, etc.
* Enable USB Debugging (ADB) in Android Developer Settings [How? ↗️](https://transmissionbt.com/)
* Then go to [ADB Tools ↗️](https://cheagana.com/#web/otros/Archivos/Dinamico/%F0%9F%A7%A9%20Apps/%F0%9F%92%9A%20Android/Gestor%20Android%20-%20Apps&+.md) from another device, connect the device to patch via USB and then press the "Connect" button, select the connected device, then on the phone "Allow this Computer?" will appear, answer YES. Then on the website press the "Commands" button and then "Termux Alive" and that's it, it should be ready.


> [!TIP]
> ## Helpful 

### Battery
Set the battery charging limit to 70% or lower. This prevents the battery from swelling. Some phones have this option in their battery settings; those that don't can adjust it with root access.

Or you can also make a direct connection [Tutorial ↗️](https://blog.kedio.co/post/how-to-run-a-oneplus-6t-without-battery/)

#### Optional Accessories
[USB OTG + Charging ↗️](https://www.aliexpress.us/item/3256807082682341.html?gatewayAdapt=glo2usa)

[USB HUB More Power Supply ↗️](https://www.aliexpress.us/w/wholesale-usb-hub-powered.html?spm=a2g0o.productlist.search.0)

[SATA to USB ↗️](https://www.aliexpress.us/w/wholesale-sata-to-usb.html?spm=a2g0o.detail.search.0)

# Extra
If you found this interesting, then you'll also be interested in other Termux projects like bots for WhatsApp, Telegram, Discord, etc. You can see a list here: [Repo TermuxGod  ↗️](https://github.com/weskerty/TermuxGod)


