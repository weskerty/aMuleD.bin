

<style>

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
}

@media (min-width: 600px) {
  .menu-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 7px 11px; 
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.15) 100%
  );
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
}

.menu-item:hover {
  transform: translateY(-3px);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.25) 100%
  );
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08);
  text-decoration: none;
}

.menu-content {
  flex: 1;
  text-align: center;
  padding: 6px 8px;
  position: relative;
  z-index: 2;
}

.menu-content h3 {
  margin: 0 0 3px 0;
  font-size: 1.4em;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.menu-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95em;
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

@media (max-width: 600px) {
  .menu-item {
    flex-direction: column;
    text-align: center;
    text-decoration: none;
  }
}

</style>




<div style="text-align:center;">
<h1>💞 Tiendas Similares</h1>
<p>Se listan por su prácticas ecológicas. No estan Relacionadas a YoGano</p>
</div>

<div class="menu-list">
  <a href="https://forum.emule-project.net/" class="menu-item">
    <img src="https://planetaverdealmacen.com/wp-content/uploads/2024/02/LOGO-TRANS-VERDE-MUSGO.png">
    <div class="menu-content">
      <h3> eMule Forum</h3>
      <p>EN - ES - IT Official eMule Forum</p>
    </div>
  </a>

  <a href="https://www.reddit.com/r/emule/" class="menu-item">
    <img src="https://styles.redditmedia.com/t5_7jhgmv/styles/communityIcon_l39cd5dpcf4f1.png">
    <div class="menu-content">
      <h3>eMule Reddit</h3>
      <p> MultiLang Reddit </p>
    </div>
  </a>

  <a href="https://t.me/EMULE_SPAIN" class="menu-item">
    <img src="https://reserva-ecologica.com/s3/b/wsw.website.7236/public/images/pages/folder.4/site_logo.png">
    <div class="menu-content">
      <h3>eMule España Telegram</h3>
      <p> Only Spanish Chat Group </p>
    </div>
  </a>
  
   <a href="https://www.emule-project.com/home/perl/help.cgi?l=1&topic_id=140&rm=show_topic" class="menu-item">
    <img src="https://www.emule-project.com/home/img/logo.jpg">
    <div class="menu-content">
      <h3> eMule IRC </h3>
      <p> IRC Chat </p>
    </div>
  </a>
  
</div>

</br>



</div>