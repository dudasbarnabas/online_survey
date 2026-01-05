const SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwJxB4NLXnfpby4pQMcdRzgydNrzQ7N7km2duynZvFvwxHXZoxQa_ex_q9E9RYdSz0V9A/exec"; // ← put your endpoint here
const pages = [
    {
      name: "intro",
      elements: [
        {
          type: "panel",
          name: "intro",
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
    },
    {
      "name": "choose",
      "elements": [
        {
          "type": "radiogroup",
          "name": "path",
          "title": "Kérem jelölje kitöltötte-e már ezt a kérdőívet",
          "description": "A kérdőív a személyes adatok, médiafogyasztási szokások és időpontegyeztető oldalakból áll.",
          "isRequired": true,
          "choices": [
            {
              "value": "full",
              "text": "Mind a három blokkot kitöltöm most."
            },
            {
              "value": "woq",
              "text": "Csak megadom az adataimat és időpontot egyeztetek, a médiafogyasztási szokásokra vonatkozó kérdőívet még nem töltöm ki."
            },
            {
              "value": "jq",
              "text": "Már megadtam az adataimat, egyeztettem időpontot. Csak a médiafogyasztási médiafogyasztási szokásokra vonatkozó kérdőívet tölteném ki."
            },
            {
              "value": "date",
              "text": "Már mindent kitöltöttem, új időpontot szeretnék egyeztetni."
            }
          ]
        }
      ]
    },
    {
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
          "type": "text",
          "name": "age",
          "title": "Kérem, adja meg életkorát (években)",
          "isRequired": true,
          "inputType": "number"
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
          "isRequired": true,
          "labelTrue": "Igen",
          "labelFalse": "Nem"
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
              "name": "faq_femek",
              "html": "Az MRI nagyon erős mágneses teret használ, ami a ferromágneses (mágnes által erősen vonzott) fémeket megmozdíthatja vagy elfordíthatja, és ez veszélyes lehet (például sérülést okozhat). Emellett bizonyos fémek a rádióhullámok miatt felmelegedhetnek, ami szintén kockázat. Ezért kell mindig előre jelezni, ha van a testedben például implantátum, klipsz, fémrögzítés, pacemaker, vagy bármi hasonló. <a href=\"https://dudasbarnabas.github.io/online_survey/faq\" target=\"_blank\" rel=\"noopener noreferrer\">FAQ</a>"
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
          "title": "Van/volt diagnosztizált neurológiai/pszichiátriai zavarom",
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
        },
        {
          "type": "radiogroup",
          "name": "hand",
          "title": "Jobb- vagy balkezes?",
          "isRequired": true,
          "choices": [
            {
              "value": "jobb",
              "text": "Jobbkezes"
            },
            {
              "value": "bal",
              "text": "Balkezes"
            },
            {
              "value": "idk",
              "text": "Nem tudom eldönteni"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "edu_highest",
          title: "Mi az Ön legmagasabb befejezett iskolai végzettsége?",
          isRequired: true,
          choices: [
            { value: "primary_or_less", text: "Legfeljebb 8 általános" },
            { value: "vocational_no_matura", text: "Szakmunkás / szakiskola (érettségi nélkül)" },
            { value: "secondary_matura", text: "Középiskola (érettségi)" },
            { value: "postsecondary", text: "Felsőfokú szakképzés / OKJ / technikum utáni szakképzés" },
            { value: "ba_bsc", text: "Főiskola / alapképzés (BA/BSc)" },
            { value: "ma_msc", text: "Egyetem / mesterképzés (MA/MSc)" },
            { value: "phd", text: "Doktori fokozat (PhD / DLA)" }
          ],
          showOtherItem: true,
          otherText: "Egyéb, éspedig:",
          colCount: 1
        }
      ]
    },
    {
      "name": "questionnaire",
      "visibleIf": "{path} = 'jq' or {path} = 'full'",
      "elements": [
        {
          "type": "panel",
          "name": "bsmas",
          "elements": [
            {
              "type": "expression",
              "name": "A következőkben kifejezetten csak a KÖZÖSSÉGI OLDALAK (Facebook, Instagram, Tiktok, Youtube stb.) használatával kapcsolatban olvashat néhány állítást.\nÖn tapasztalta-e, és ha igen, milyen gyakran az elmúlt évben a következőket?"
            }, {
                type: "rating",
                name: "bsmas1",
                title: "Sokat gondoltam a közösségi oldalakra, vagy arra, hogy mit fogok csinálni, amikor újra használhatom őket.",
                isRequired: true,
                rateCount: 5,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "Soha",
                maxRateDescription: "(Majdnem) mindig"
            }, {
                type: "rating",
                name: "bsmas2",
                title: "Késztetést éreztem, hogy egyre több időt töltsek a közösségi oldalakon.",
                isRequired: true,
                rateCount: 5,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "Soha",
                maxRateDescription: "(Majdnem) mindig"
            }, {
                type: "rating",
                name: "bsmas3",
                title: "Arra használtam a közösségi oldalakat, hogy megfeledkezzek a személyes problémáimról.",
                isRequired: true,
                rateCount: 5,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "Soha",
                maxRateDescription: "(Majdnem) mindig"
            }, {
                type: "rating",
                name: "bsmas4",
                title: "Megpróbáltam kevesebb időt tölteni a közösségi oldalakon, de nem sikerült.",
                isRequired: true,
                rateCount: 5,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "Soha",
                maxRateDescription: "(Majdnem) mindig"
            }, {
                type: "rating",
                name: "bsmas5",
                title: "Nyugtalanná vagy zaklatottá váltam, ha nem használhattam a közösségi oldalakat.",
                isRequired: true,
                rateCount: 5,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "Soha",
                maxRateDescription: "(Majdnem) mindig"
            }, {
                type: "rating",
                name: "bsmas6",
                title: "A közösségi oldalakon töltött idő negatív hatással volt a tanulmányi vagy munkahelyi eredményemre.",
                isRequired: true,
                rateCount: 5,
                rateMin: 1,
                rateMax: 5,
                minRateDescription: "Soha",
                maxRateDescription: "(Majdnem) mindig"
            }, {
            }]
            },
            {
              "type": "panel",
              "name": "time",
              "elements": [
                {
                  "type": "expression",
                  "name": "Kérjük adja meg NAPONTA hány PERCET tölt az alábbi alkalmazások használatával."
                }, 
                {
                  "type": "text",
                  "name": "facebook",
                  "title": "Facebook",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "instagram",
                  "title": "Instagram",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "tiktok",
                  "title": "TikTok",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "x",
                  "title": "X",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "snapchat",
                  "title": "Snapchat",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "bereal",
                  "title": "BeReal",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "youtube",
                  "title": "YouTube",
                  "isRequired": true,
                  "inputType": "number"
                },
                {
                  "type": "text",
                  "name": "apps",
                  "title": "Egyéb közösségi média alkalmazások (nevezze meg: alkalmazás neve és idő) (amennyiben több ilyen van, a tételeket pontosvesszővel ; válassza el)",
                  "placeholder": "Alkalmazás, idő;"
                }
              ]
            }
          ]
    },
    {
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
                  "html": "Ahhoz, hogy időpontot tudjunk egyeztetni, szükségünk van a telefonszámára és e-mail-címére. Ezeket az adatokat kizárólag a jelen kutatási ciklus ideje alatt tároljuk, más célra nem használjuk fel, és harmadik fél részére nem adjuk át. Az időpont-egyeztetéssel kapcsolatos kommunikációt ezeken a csatornákon bonyolítjuk."
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
                  "html": "Ahhoz, hogy a korábbi kitöltésével összekapcsolhassuk a most megadott információkat szügségünk van ugyanarra az e-mail címre."
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
          "visibleIf": "{path} = 'full' or {path} = 'date' or {path} = 'woq'",
          "elements": [
            {
              "type": "panel",
              "name": "book_panel",
              "visibleIf": "{path} = 'full' or {path} = 'date' or {path} = 'woq'",
              "title": "Mit tegyek, ha nem jó egyik időpont se? Miért érdemes több időpontot bejelölni?",
              "description": "FAQ",
              "state": "collapsed",
              "elements": [
                {
                  "type": "html",
                  "name": "faq_book",
                  "html": "Ha előre láthatóan egyik időpont akkor időpont megjelölése nélkül is érdemes beküldened az ívet. Így, ha új időpontjaink lesznek, akkor e-mailben tudunk értesíteni. Igyekszünk mindenki számára időpontot biztosítani. Amennyiben van több meghirdetett üres időpontunk, a helyek kiosztásánál előnyt élveznek azok, akik több dátumot is megfelelőnek jelöltek, így jelentősen hozzásegítettek minket a kutatási idő hézagmentes feltöltéséhez."
                }
              ]
            },
            {
              "type": "checkbox",
              "name": "date_check",
              "title": "Melyik időpont(ok)ban tudna résztvenni a kutatásban?",
              "choices": [
                "2026.01.12. 13:30"
              ]
            },
            {
              "type": "panel",
              "name": "info_panel",
              "visibleIf": "{path} = 'full' or {path} = 'date' or {path} = 'woq'",
              "title": "Tájékoztató",
              "description": "",
              "state": "open",
              "elements": [
                {
                  "type": "html",
                  "name": "study_info",
                  "html": "Ezen kérdőív kitöltése nem jelenti az időpont lefoglalását. Az esetleges részvételével és annak tényleges időpontjával kapcsolatban telefonon és/vagy emailben keresni fogjuk.<br/><br/>" +
                  "A kutatás helyszíne 7623, Pécs Rét utca 2. Pécsi Diagnosztikai Központ épülete. <br/><br/>" +
                  "Az MR szempontjából fontos, hogy 1. kényelmes ruhában jöjjön; 2. az ékszereit, testékszereit lehetőség szerint vegye ki még otthon; 3. a mérés előtti este igyekezzen sokat aludni, és lehetőség szerint kerülje a túlzott alkoholfogyasztást. <br/><br/>" +
                  "Adminisztrációs okoknál fogva TESCO vásárlási utalványokban tudjuk a tiszteletdíjat biztosítani. <br/><br/>" +
                  "Ha kérdése van vegye fel velünk a kapcsolatot e-mail-ben. <a href=\"mailto:fatiguestudy20@gmail.com\">fatiguestudy20@gmail.com</a>"
                }
              ]
            },
            {
              "type": "checkbox",
              "name": "nyilatkozat",
              "title": "Nyilatkozat",
              "isRequired": true,
              "choices": [
                {
                  "value": "agree",
                  "text": "Elolvastam a kutatással kapcsolatos tájékoztatót, annak tartalmát elfogadom"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "sorry",
      "visibleIf": "{fem} = true or {preg} = true or {psych} = true or {brain} = true or {hand} <> 'jobb",
      "elements": [
        {
          "type": "panel",
          "name": "elutasit",
          "elements": [
            {
              "type": "html",
              "name": "sajnalom",
              "visibleIf": "{fem} = true or {preg} = true or {psych} = true or {brain} = true or {hand} <> 'jobb'",
              "html": "Tájékoztatjuk, hogy a megadott válaszok alapján jelenleg nem felel meg a vizsgálat MRI-biztonsági és/vagy kutatási részvételi feltételeinek, ezért a kutatásban való részvétele nem lehetséges.\nA kritériumok célja a résztvevők biztonságának garantálása és a vizsgálati adatok megbízhatóságának biztosítása. Köszönjük az érdeklődését és az együttműködését."
            }
          ]
        }
      ]
    }
]

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
    },
    {
      type: "skip",
      expression: "{hand} <> 'jobb'",
      gotoName: "sajnalom"
    },
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