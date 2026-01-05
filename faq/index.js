
// Build pages:
const pages = [];

// If you prefer the instruction ONCE at the beginning, keep this intro page
pages.push({
  name: "faq",
  elements: [
        {
          "type": "panel",
          "name": "faq_mri",
          "title": "Mi az MRI?",
          "description": "",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "faq_mri_details",
              "html": "Az MRI (mágneses rezonancia képalkotás) egy fájdalommentes, sugárzásmentes orvosi vizsgálat, ami erős mágneses tér és rádióhullámok segítségével készít részletes képeket a test belsejéről – például az agyról. A vizsgálat során egy csőszerű készülékben kell mozdulatlanul feküdni, miközben a gép hangos kopogó-zúgó hangokat ad ki, ezért általában adnak füldugót vagy fejhallgatót. Az MRI nem röntgen, tehát nem ionizáló sugárzással működik."
            }
          ]
        },
        {
          "type": "panel",
          "name": "faq_femek",
          "title": "Miért fontos, hogy ne legyen ferromágneses / fém tárgy a szervezetben?",
          "description": "",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "faq_femek",
              "html": "Az MRI nagyon erős mágneses teret használ, ami a ferromágneses (mágnes által erősen vonzott) fémeket megmozdíthatja vagy elfordíthatja, és ez veszélyes lehet (például sérülést okozhat). Emellett bizonyos fémek a rádióhullámok miatt felmelegedhetnek, ami szintén kockázat. Ezért kell mindig előre jelezni, ha van a testedben például implantátum, klipsz, fémrögzítés, pacemaker, vagy bármi hasonló. Ilyenek például: <ul><li>Pacemaker (szívritmus-szabályozó)</li><li>Beültethető defibrillátor (ICD)</li><li>Beültetett szívritmus-monitor / loop recorder</li><li>Agyér-aneurysma klip (érklipsz)</li><li>Ércoilek/tekercsek, érszűrők, egyéb érimplantátumok</li><li>Stent (pl. koszorúér-, agyi-, perifériás stent) / stentgraft</li><li>Cochleáris implantátum (belső fül implantátum)</li><li>Neurostimulátorok (pl. DBS, gerincvelő-stimulátor, vagus ideg stimulátor)</li><li>Beültetett gyógyszeradagoló pumpa (pl. fájdalomcsillapító/egyéb pumpa)</li><li>Ortopédiai fémek: csavarok, lemezek, rögzítőpálcák, gerincfixációs anyagok</li><li>Ízületi protézisek (pl. csípő-, térdprotézis)</li><li>Fogászati implantátum / fémes fogpótlás (pl. implantátumcsavar, híd, korona)</li><li>Fogszabályzó (fix készülék, fém bracketek/huzalok)</li><li>Tartós vércukormérő szenzor (CGM) vagy egyéb bőr alatti szenzor/„patch”</li><li>Fém idegentest/szilánk (különösen szemben), korábbi sérülésből visszamaradt fém</li></ul>"
            }
          ]
        },
        {
          "type": "panel",
          "name": "faq_mr_fem",
          "title": "Mi a helyzet az „MRI-biztos” fémekkel?",
          "description": "",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "faq_mri_biztos",
              "html": "Mert az „MRI-biztos / MRI-kompatibilis” fémek egy része ugyan nem veszélyes, de a felvételeken műterméket okozhat. Ez azt jelenti, hogy a képen torzulás, csíkok, elmosódás vagy jelvesztés jelenhet meg, ami rontja a vizsgálat értékelhetőségét – főleg, ha a fém közel van ahhoz a területhez, amit vizsgálunk."
            }
          ]
        },
    ]
});


const surveyJson = {
title: "Gyakori Kérdések",
description: "༼ つ ◕_◕ ༽つ A kutatásainkkal kapcsolatos fontosabb kérdések áttekintője (´▽`ʃ♡ƪ)",
logo: "../favicon.png",
logoHeight: "60px",
pages: pages
};


const survey = new Survey.Model(surveyJson);
survey.showCompleteButton = false;
document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
    });
