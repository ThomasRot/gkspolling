(() => {
  const cfg = window.UMFRAGE;
  const $ = (id) => document.getElementById(id);

  let klasse = null;
  let antwort = null;

  if (!cfg.klasseFeld) console.warn("config.js: klasseFeld fehlt – die Klasse wird nicht gespeichert.");

  function zeige(schritt) {
    for (const s of ["klasse", "frage", "danke"]) $("schritt-" + s).hidden = s !== schritt;
    window.scrollTo(0, 0);
  }

  function renderKlassen() {
    const box = $("klassen");
    box.replaceChildren();
    for (const k of cfg.klassen) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kachel";
      btn.innerHTML = `<span class="icon">${k.icon}</span><span>${k.name}</span>`;
      btn.addEventListener("click", () => waehleKlasse(k));
      box.append(btn);
    }
  }

  function waehleKlasse(k) {
    klasse = k;
    antwort = null;
    $("gewaehlte-klasse").textContent = `${k.icon} ${k.name}`;
    renderAntworten();
    zeige("frage");
  }

  function renderAntworten() {
    const box = $("antworten");
    box.replaceChildren();
    for (const a of cfg.antworten) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "antwort";
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = (a.icon ? `<span class="icon">${a.icon}</span>` : "") + `<span></span>`;
      btn.lastChild.textContent = a.text;
      btn.addEventListener("click", () => {
        antwort = a;
        for (const b of box.children) b.setAttribute("aria-pressed", String(b === btn));
        $("absenden").disabled = false;
      });
      box.append(btn);
    }
    $("absenden").disabled = true;
    $("fehler").hidden = true;
  }

  async function absenden() {
    const btn = $("absenden");
    btn.disabled = true;
    $("fehler").hidden = true;

    const daten = new URLSearchParams();
    daten.append(cfg.antwortFeld, antwort.text);
    if (cfg.klasseFeld) daten.append(cfg.klasseFeld, klasse.name);

    try {
      // no-cors: Antwort ist nicht lesbar, nur Netzwerkfehler werden erkannt.
      await fetch(`https://docs.google.com/forms/d/e/${cfg.formularId}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        body: daten,
      });
    } catch {
      $("fehler").hidden = false;
      btn.disabled = false;
      return;
    }

    zeige("danke");
    setTimeout(neustart, cfg.zurueckNachSekunden * 1000);
  }

  function neustart() {
    klasse = null;
    antwort = null;
    zeige("klasse");
  }

  $("frage").textContent = cfg.frage;
  $("zurueck").addEventListener("click", () => zeige("klasse"));
  $("absenden").addEventListener("click", absenden);
  renderKlassen();
  neustart();
})();
