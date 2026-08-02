<div style="text-align:center;"
<p align="center">
<img src="https://github.com/user-attachments/assets/2c2d84b9-127e-4257-a5e4-cac54c557944" alt="Muly" width="170">
<h1 align="center">aMuTorrent en Termux</h1> 
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
    <td><img width="400" src="https://github.com/user-attachments/assets/40d1ae31-95b8-4fe7-8a7c-2f592d009f2e"></td>
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
- Enlace Simbolico a Disco Duro OTG (o varios con mergerfs. no funciona en termux falta modificar su fuse.)
- SFTP con otras maquinas
- NFS con otras maquinas (NFS paquete requiere root)



# Termux Google Play Store
<img width="1000" height="266" alt="zzzgoogle" src="https://github.com/user-attachments/assets/abf89ae6-bf50-43de-b20a-c257a5d1f19e" />


La version que encuentras en PlayStore no funciona bien, el servicio se ejecutara, pero no funcionara: [Radarr ↗️](https://radarr.video/), [Sonarr ↗️](https://sonarr.tv/) ni [Prowlarr ↗️](https://prowlarr.com/docs/api/) solo funcionara la  [Busqueda aMule ↗️](https://amule-org.github.io/docs) y descargas directas de [Transmission ↗️](https://transmissionbt.com/)

# Acceder fuera de la red Local
Para esto debes activar el Reenvio de Puertos en tu Router y ademas recomendaria cambiar la contraseña del gestor, tambien de los demas servicios que usa mencionados anteriormente, ya que todos tienen la misma contraseña.

# No Funciona?
En nuevas versiones de Android (A12 y Superior) el sistema no permite que Termux se mantenga vivo en segundo plano
Para solucionar esto Necesitas Hacer unos pasos extra para Corregir.
1- Ajustes de tu Telefono > Bateria > Prioridad a Termux en Todo, Inicio automatico, de fondo, etc.
2- Activar Depuracion USB (ADB) en Ajustes de Desarrollador de Android [Como? ↗️](https://transmissionbt.com/)
3- Luego ve a [ADB Tools ↗️](https://cheagana.com/#web/otros/Archivos/Dinamico/%F0%9F%A7%A9%20Apps/%F0%9F%92%9A%20Android/Gestor%20Android%20-%20Apps&+.md) desde otro Dispositivo, Conecta el Dispositivo a Parchear por USB y luego Presiona el boton "Conectar", selecciona el dispositivo conectado, luego en el telefono aparecera "Permitir este Ordenador?" reponde SI, Luego en la Web presionas el boton "Comandos" y luego "Termux Alive" y listo, ya estaria.




