<h1> </h1>
<div style="text-align:center;"
<p align="center">
<img src="https://github.com/user-attachments/assets/2c2d84b9-127e-4257-a5e4-cac54c557944" alt="Muly" width="170">
<h1>aMuTorrent on Termux</h1> 
P2P Suite in Your Pocket

  <table>
    <tr>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/home-mobile.png" /></td>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/downloads-mobile.png" /></td>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/history-mobile.png" /></td>
    </tr>
  </table>

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

## Installation

### Android

Download and Install Termux from here: [Termux Repo ↗️](https://github.com/termux/termux-app/releases)

Then open Termux and paste this:

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
cd aMuTorrent/repo && node server/server.js
```

Startup can be automated with TermuxBoot/Tasker and a .bashrc that automatically starts the command above.

# Not Working?

In newer Android versions (A12 and above), the system does not allow Termux to stay alive in the background.

To solve this, you need to perform some extra steps to fix it.

* Phone Settings > Battery > Give Termux priority in everything, automatic startup, background operation, etc.
* Enable USB Debugging (ADB) in Android Developer Settings [How? ↗️](https://transmissionbt.com/)
* Then go to [ADB Tools ↗️](https://cheagana.com/#web/otros/Archivos/Dinamico/%F0%9F%A7%A9%20Apps/%F0%9F%92%9A%20Android/Gestor%20Android%20-%20Apps&+.md) from another device, connect the device to patch via USB and then press the "Connect" button, select the connected device, then on the phone "Allow this Computer?" will appear, answer YES. Then on the website press the "Commands" button and then "Termux Alive" and that's it, it should be ready.


---

<h1>Tutorial en Español </h1>
<div style="text-align:center;"
<p align="center">
<img src="https://github.com/user-attachments/assets/2c2d84b9-127e-4257-a5e4-cac54c557944" alt="Muly" width="170">
<h1>aMuTorrent en Termux</h1> 
Suite P2P en tu Bolsillo

  <table>
    <tr>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/home-mobile.png" /></td>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/downloads-mobile.png" /></td>
      <td><img width="400" src="https://raw.githubusercontent.com/got3nks/amutorrent/main/docs/screenshots/history-mobile.png" /></td>
    </tr>


  </table>
  
# Consumo Minimo de Recursos

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
  El consumo electrico es Minimo, menos que un foco. Aun menor sin disco duro. Puedes Reutilizar Dispositivos Android Antiguos (Desde Android 5). Cuidemos el Mundo que Dios nos dio ❤️

</div>




## Instalacion

### Android 
Descarga e Instala Termux desde aqui: [Termux Repo ↗️](https://github.com/termux/termux-app/releases) 

Luego abre Termux y pega esto:

```
curl -fsSL https://raw.githubusercontent.com/weskerty/aMuleD.bin/refs/heads/master/INSTALL.sh | bash

```
Apareceran Preguntas de "Permitir Acceder a Todos los Archivos" y "Permitir Ejecucion en Segundo plano sin Restriccion de Bateria?" y en ambos marcas SI.

Luego de un rato el Servicio estara listo, veras un mensaje "Inicia en el Navegador"

Entra a [http://localhost:4000 ↗️](http://localhost:4000)  para controlar o desde otro dispositivo con la IP local del Telefono Servidor.

Las descargas aparecen en Downloads/aMuTorrent/

## Usuario: 
```
admin

```
## Contraseña
```
1234567890-p

```

Para ajustar [Radarr ↗️](https://radarr.video/), [Sonarr ↗️](https://sonarr.tv/) y [Prowlarr ↗️](https://prowlarr.com/docs/api/) accede con sus respectivos Puertos.


### Almacenamiento Externo - Discos Duros USB OTG
Hay diversas formas de almacenamiento
- Enlace Simbolico a MicroSD (Muchos telefonos soportan hasta 2TB en SD)
- Enlace Simbolico a Disco Duro OTG (dependiendo de la rom, muchos no hacen dormir el disco duro al dejar de usar, requieres root para configurar.)
- SFTP con otras maquinas
- NFS con otras maquinas (requiere root)



# Termux Google Play Store
<img width="1000" height="266" alt="zzzgoogle" src="https://github.com/user-attachments/assets/abf89ae6-bf50-43de-b20a-c257a5d1f19e" />


La version que encuentras en PlayStore no funciona bien, el servicio se ejecutara, pero no funcionara: [Radarr](https://radarr.video/), [Sonarr](https://sonarr.tv/) ni [Prowlarr](https://prowlarr.com/docs/api/) solo funcionara la  [Busqueda aMule](https://amule-org.github.io/docs) y descargas directas de [Transmission](https://transmissionbt.com/)

# Acceder fuera de la red Local
Para esto debes activar el Reenvio de Puertos en tu Router y ademas recomendaria cambiar la contraseña del gestor, tambien de los demas servicios que usa mencionados anteriormente, ya que todos tienen la misma contraseña.

# Auto Iniciar - Volver a Abrir
Volver a Iniciar:
Entrar a Termux y Pegar:
```
cd aMuTorrent/repo && node server/server.js

```

Se puede automatizar el inicio con TermuxBoot/Tasker y un .bashrc que autoinicie el comando de Arriba.

# No Funciona?
En nuevas versiones de Android (A12 y Superior) el sistema no permite que Termux se mantenga vivo en segundo plano
Para solucionar esto Necesitas Hacer unos pasos extra para Corregir.
- Ajustes de tu Telefono > Bateria > Prioridad a Termux en Todo, Inicio automatico, de fondo, etc.
- Activar Depuracion USB (ADB) en Ajustes de Desarrollador de Android [Como? ↗️](https://transmissionbt.com/)
- Luego ve a [ADB Tools ↗️](https://cheagana.com/#web/otros/Archivos/Dinamico/%F0%9F%A7%A9%20Apps/%F0%9F%92%9A%20Android/Gestor%20Android%20-%20Apps&+.md) desde otro Dispositivo, Conecta el Dispositivo a Parchear por USB y luego Presiona el boton "Conectar", selecciona el dispositivo conectado, luego en el telefono aparecera "Permitir este Ordenador?" reponde SI, Luego en la Web presionas el boton "Comandos" y luego "Termux Alive" y listo, ya estaria.




