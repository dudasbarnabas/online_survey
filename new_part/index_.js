const SHEETS_WEB_APP_URL = ""; // ← put your endpoint here

// Build pages:
const pages = [];

pages.push({
  name: "intro",
  elements: [
    {
      type: "panel",
      name: "panel1",
      elements: [
        {
          type: "html",
          name: "introduction",
          html:
            "Kedves Kitöltő!<br/><br/>" +
            "A PTE ÁOK Magatartástudományi Intézet Kognitív Idegtudományi Tanszéke, a PTE KK Neurológiai Klinika, valamint a Pécsi Diagnosztikai Központ munkacsoportja önkénteseket toboroz kutatási célra. " +
            "A vizsgálat keretében egy rövid kérdőívcsomag kitöltésére és egy MRI-vizsgálaton való részvételre kerül sor.<br/><br/>" +
            "A részvételért 5 000 Ft tiszteletdíjat biztosítunk. A kérdőívcsomag kitöltése és az MRI-vizsgálat összesen körülbelül 1,5 órát vesz igénybe. " +
            "Az eljárás fájdalommentes és beavatkozással nem jár.<br/><br/>" +
            "Amennyiben érdekli a kutatásban való részvétel, kérjük adja meg nevét és telefonszámát, és kollégánk hamarosan felveszi Önnel a kapcsolatot.<br/><br/>" +
            "Dr. Darnai Gergely<br/>" +
            "tudományos főmunkatárs"
        }
      ]
    }
  ]
});


pages.push({
  "name": "choose",
    "elements": [
      {
        "type": "radiogroup",
        "title": "Kérem jelölje kitöltötte-e már a kérdőívet",
        "name": "path",
        "choices": [
          {
            "value": "full",
            "text": "Még nem töltöttem ki"
          },
          {
            "value": "woq",
            "text": "Még nem töltöttem ki, most nincs időm a kérdőívre"
          },
          {
            "value": "jq",
            "text": "Már kitöltöttem, a kérdőívcsomagot szeretném kitölteni"
          },
          {
            "value": "date",
            "text": "Már kitöltöttem, időpontot egyeztetnék"
          }
        ]
      }
    ]
})

pages.push({
    "name": "demography",
    "visibleIf": "{path} = 'full' or {path} = 'woq'",
      "elements": [
        {
          "type": "radiogroup",
          "name": "nem",
          "title": "Kérem adja meg nemét",
          "isRequired": true,
          "choices": [
            {
              "value": "1",
              "text": "Férfi"
            },
            {
              "value": "2",
              "text": "Nő"
            }
          ],
          "showOtherItem": true,
          "otherText": "Más (szabadon kitölthető)"
        },
        {
          "type": "panel",
          "name": "faq_mri",
          "title": "Mi az MRI?",
          "description": "FAQ",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "mri_details",
              "html": "Az MRI (mágneses rezonancia képalkotás) egy fájdalommentes, sugárzásmentes orvosi vizsgálat, ami erős mágneses tér és rádióhullámok segítségével készít részletes képeket a test belsejéről – például az agyról. A vizsgálat során egy csőszerű készülékben kell mozdulatlanul feküdni, miközben a gép hangos kopogó-zúgó hangokat ad ki, ezért általában adnak füldugót vagy fejhallgatót. Az MRI nem röntgen, tehát nem ionizáló sugárzással működik. <a href=\"https://dudasbarnabas.github.io/online_survey/faq\" target=\"_blank\" rel=\"noopener noreferrer\">FAQ</a>"
            }
          ]
        },
        {
          "type": "boolean",
          "name": "volt_mr",
          "title": "Korábban már vettem részt MR mérésen",
          "isRequired": true
        },
        {
          "type": "panel",
          "name": "faq_fem",
          "title": "Miért fontos, hogy ne legyen fém/ferromágneses tárgy a szervezetében?",
          "description": "FAQ",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "question2",
              "html": "Read more: <a href=\"https://dudasbarnabas.github.io/online_survey/faq\" target=\"_blank\" rel=\"noopener noreferrer\">FAQ</a>"
            }
          ]
        },
        {
          "type": "panel",
          "name": "fem_panel",
          "elements": [
            {
              "type": "html",
              "name": "femek",
              "html": "Ilyenek például: <ul><li>Pacemaker (szívritmus-szabályozó)</li><li>Beültethető defibrillátor (ICD)</li><li>Beültetett szívritmus-monitor / loop recorder</li><li>Agyér-aneurysma klip (érklipsz)</li><li>Ércoilek/tekercsek, érszűrők, egyéb érimplantátumok</li><li>Stent (pl. koszorúér-, agyi-, perifériás stent) / stentgraft</li><li>Cochleáris implantátum (belső fül implantátum)</li><li>Neurostimulátorok (pl. DBS, gerincvelő-stimulátor, vagus ideg stimulátor)</li><li>Beültetett gyógyszeradagoló pumpa (pl. fájdalomcsillapító/egyéb pumpa)</li><li>Ortopédiai fémek: csavarok, lemezek, rögzítőpálcák, gerincfixációs anyagok</li><li>Ízületi protézisek (pl. csípő-, térdprotézis)</li><li>Fogászati implantátum / fémes fogpótlás (pl. implantátumcsavar, híd, korona)</li><li>Fogszabályzó (fix készülék, fém bracketek/huzalok)</li><li>Tartós vércukormérő szenzor (CGM) vagy egyéb bőr alatti szenzor/„patch”</li><li>Fém idegentest/szilánk (különösen szemben), korábbi sérülésből visszamaradt fém</li></ul>"
            }
          ]
        },
        {
          "type": "boolean",
          "name": "fem",
          "title": "Van valamilyen fém/ferromágneses tárgy a szervezetemben",
          "isRequired": true,
          "labelTrue": "Igen",
          "labelFalse": "Nem"
        },
        {
          "type": "boolean",
          "name": "preg",
          "visibleIf": "{nem} <> 1",
          "title": "Gyermeket várok",
          "isRequired": true,
          "labelTrue": "Igen",
          "labelFalse": "Nem"
        },
        {
          "type": "boolean",
          "name": "psych",
          "title": "Van/volt neurológiai tünetem",
          "isRequired": true,
          "labelTrue": "Igen",
          "labelFalse": "Nem"
        },
        {
          "type": "boolean",
          "name": "brain",
          "title": "Volt koponyaműtétem",
          "isRequired": true,
          "labelTrue": "Igen",
          "labelFalse": "Nem"
        }
      ]
});

pages.push({
  "name": "questionnaire",
  "visibleIf": "{path} = 'jq' or {path} = 'full'",
  "elements": [
    {
      "type": "panel",
      "name": "panel1",
      "elements": [
        {
          "type": "html",
          "name": "info",
          "html": "Hello"
        }
      ]
    }
  ]
});

pages.push({
  "name": "contact",
  "elements": [
    {
      "type": "panel",
      "name": "conctact_info",
      "elements": [
        {
          "type": "panel",
          "name": "contact_panel", 
          "visibleIf": "{path} = 'full' or {path} = 'woq'",
          "title": "Miért kell személyes adatokat megadni?",
          "description": "FAQ",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "faq_contact",
              "html": ""
            }
          ]
        },
        {
          "type": "panel",
          "name": "email_panel",
          "visibleIf": "{path} = 'jq' or {path} = 'date'",
          "title": "Miért kell újra megadnom az email címet?",
          "description": "FAQ",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "faq_email",
              "html": ""
            }
          ]
        },
        {
          "type": "text",
          "name": "name",
          "visibleIf": "{path} = 'full' or {path} = 'woq'",
          "title": "Kérem adja meg a nevét",
          "isRequired": true,
          "autocomplete": "name",
          "placeholder": "Példa János"
        },
        {
          "type": "text",
          "name": "phone",
          "visibleIf": "{path} = 'full' or {path} = 'woq'",
          "title": "Kérem adja meg a telefonszámát",
          "isRequired": true,
          "inputType": "tel",
          "placeholder": "+36 30 / 99 - 99 - 999"
        },
        {
          "type": "text",
          "name": "email",
          "title": "Kérem adja meg az e-mail címét",
          "isRequired": true,
          "inputType": "email",
          "autocomplete": "email",
          "placeholder": "pelda.janos@email.com"
        }
      ]
    },
    {
      "type": "panel",
      "name": "book",
      "visibleIf": "{path} = 'full' or {path} = 'date'",
      "elements": [
        {
          "type": "panel",
          "name": "book_panel", 
          "visibleIf": "{path} = 'full' or {path} = 'date' or {path} = 'woq'",
          "title": "Miért érdemes több időpontot bejelölni?",
          "description": "FAQ",
          "state": "collapsed",
          "elements": [
            {
              "type": "html",
              "name": "faq_book",
              "html": "Igyekszünk mindenki számára időpontot biztosítani. Amennyiben van több meghirdetett üres időpontunk, a helyek kiosztásánál előnyt élveznek azok, akik több dátumot is megfelelőnek jelöltek, így jelentősen hozzásegítettek minket a kutatási idő hézagmentes feltöltéséhez."
            },
          ]
        },
        {
          "type": "checkbox",
          "name": "date_check",
          "visibleIf": "{path} = 'full' or {path} = 'date' or {path} = 'woq'"
          "title": "Melyik időpont(ok)ban tudna résztvenni a kutatásban?",
          "choices": [
            "2026.01.15. 11:30"
          ]
        }
      ]
    }
  ]
});

pages.push({
  "name": "sorry",
  "visibleIf": "{fem} = true or {preg} = true or {psych} = true or {brain} = true",
  "elements": [
    {
      "type": "panel",
      "name": "elutasit",
      "elements": [
        {
          "type": "html",
          "name": "sajnalom",
          "visibleIf": "{fem} = true or {preg} = true or {psych} = true or {brain} = true",
          "html": "Tájékoztatjuk, hogy a megadott válaszok alapján jelenleg nem felel meg a vizsgálat MRI-biztonsági és/vagy kutatási részvételi feltételeinek, ezért a kutatásban való részvétele nem lehetséges.\nA kritériumok célja a résztvevők biztonságának garantálása és a vizsgálati adatok megbízhatóságának biztosítása. Köszönjük az érdeklődését és az együttműködését."
        }
      ]
    }
  ]
});




// pages.push({ //BSMAS
//       name: "bsmas",
//       elements: [
//         {
//           "type": "expression",
//           "name": "A következőkben kifejezetten csak a KÖZÖSSÉGI OLDALAK (Facebook, Instagram, Tiktok, Youtube stb.) használatával kapcsolatban olvashat néhány állítást.\nÖn tapasztalta-e, és ha igen, milyen gyakran az elmúlt évben a következőket?"
//         }, {
//             type: "rating",
//             name: "bsmas1",
//             title: "Sokat gondoltam a közösségi oldalakra, vagy arra, hogy mit fogok csinálni, amikor újra használhatom őket.",
//             isRequired: true,
//             rateCount: 5,
//             rateMin: 1,
//             rateMax: 5,
//             minRateDescription: "Soha",
//             maxRateDescription: "(Majdnem) mindig"
//         }, {
//             type: "rating",
//             name: "bsmas2",
//             title: "Késztetést éreztem, hogy egyre több időt töltsek a közösségi oldalakon.",
//             isRequired: true,
//             rateCount: 5,
//             rateMin: 1,
//             rateMax: 5,
//             minRateDescription: "Soha",
//             maxRateDescription: "(Majdnem) mindig"
//         }, {
//             type: "rating",
//             name: "bsmas3",
//             title: "Arra használtam a közösségi oldalakat, hogy megfeledkezzek a személyes problémáimról.",
//             isRequired: true,
//             rateCount: 5,
//             rateMin: 1,
//             rateMax: 5,
//             minRateDescription: "Soha",
//             maxRateDescription: "(Majdnem) mindig"
//         }, {
//             type: "rating",
//             name: "bsmas4",
//             title: "Megpróbáltam kevesebb időt tölteni a közösségi oldalakon, de nem sikerült.",
//             isRequired: true,
//             rateCount: 5,
//             rateMin: 1,
//             rateMax: 5,
//             minRateDescription: "Soha",
//             maxRateDescription: "(Majdnem) mindig"
//         }, {
//             type: "rating",
//             name: "bsmas5",
//             title: "Nyugtalanná vagy zaklatottá váltam, ha nem használhattam a közösségi oldalakat.",
//             isRequired: true,
//             rateCount: 5,
//             rateMin: 1,
//             rateMax: 5,
//             minRateDescription: "Soha",
//             maxRateDescription: "(Majdnem) mindig"
//         }, {
//             type: "rating",
//             name: "bsmas6",
//             title: "A közösségi oldalakon töltött idő negatív hatással volt a tanulmányi vagy munkahelyi eredményemre.",
//             isRequired: true,
//             rateCount: 5,
//             rateMin: 1,
//             rateMax: 5,
//             minRateDescription: "Soha",
//             maxRateDescription: "(Majdnem) mindig"
//         }, {
//         }]
//     });


const surveyJson = {
title: "Kutatásra jelentkezés",
description: "༼ つ ◕_◕ ༽つ A (*)-al jelölt mezők kitöltése kötelező. A kérdőív beküldése a (Complete) gombbal történik, a böngésző, a válasz sikeres mentéséről visszajelez. (´▽`ʃ♡ƪ)",
logo: "../favicon.png",
logoHeight: "60px",
pages: pages,
triggers: [
    {
      type: "skip",
      expression: "{fem} = true or {preg} = true or {psych} = true or {brain} = true",
      gotoName: "sajnalom"
    }
  ],
};

const survey = new Survey.Model(surveyJson);

function alertResults(sender) {
  const payload = { timestamp: new Date().toISOString(), ...sender.data };

  fetch(SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  })
  .then(() => alert("Köszönjük! A válasza mentésre került (*^▽^*) ✅"))
  .catch((err) => {
    console.error(err);
    alert("Hmm, couldn't save due to a network error. Please try again 🙏");
  });
}

survey.onComplete.add(alertResults);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});

