// Build pages: for i = 1..18 do CTi, Instai, CT(i+18), SMi, TikToki (=> 90 pages)
const pages = [];

// If you prefer the instruction ONCE at the beginning, keep this intro page
pages.push({
  name: "intro",
  elements: [{
        "type": "expression",
        "name": "Kedves Résztvevő! \n\n A kérdések itt kezdődnek. Ha kitöltötte a kérdéseket az adott oldalon kérem lépjen a következő oldalra, hogy a válaszok mentésre kerüljenek."
  }
  ]
});



// pages.push({
//     name: "demography",
//     elements: [ 
//     {
//         type: "text",
//         name: "kor",
//         title: "Kérem adja meg életkorát!",
//         isRequired: true,
//         inputType: "number",
//         min: 1,
//         max: 100
//     }, {
//         type: "radiogroup",
//         name: "nem",
//         title: "Kérem adja meg nemét",
//         choices: [
//           {
//             value: "1",
//             text: "Férfi"
//           },
//           {
//             value: "2",
//             text: "Nő"
//           }
//         ],
//         showOtherItem: true,
//         otherText: "Más (szabadon kitölthető)"
//     }
  
//   ]
// });
pages.push({
    name: "",
    elements: [
      {
        "type": "expression",
        "name": "Mennyi időt tölt az alábbi online felületek használatával?"
      }, 
      {
          type: "text",
          name: "facebook",
          title: "Egy héten hány órát tölt átlagosan a Facebook-on?",
          inputType: "number"
      },
      {
          type: "text",
          name: "insta",
          title: "Egy héten hány órát tölt átlagosan a Instagram-on?",
          inputType: "number"
      },
      {
          type: "text",
          name: "tiktok",
          title: "Egy héten hány órát tölt átlagosan a TikTok-on?",
          inputType: "number"
      },
      {
          type: "text",
          name: "youtube",
          title: "Egy héten hány órát tölt átlagosan a YouTube-on?",
          inputType: "number"
      },
      {
          type: "text",
          name: "twitter",
          title: "Egy héten hány órát tölt átlagosan a X-en?",
          inputType: "number"
      },
  ]
});

pages.push({
    name: "diagnostic",
    elements: [ 
      {
          type: "checkbox",
          name: "Az internetfüggőség legfontosabb 5 tünete:",
          maxSelectedChoices: 5,
          choices: [
            "Kontrollvesztés az internethasználat felett",
            "Az internethasználat abbahagyásának nehézsége",
            "A tervezettnél hosszabb online időtöltés",
            "Sikertelen próbálkozások a használat csökkentésére",
            "Állandó késztetés az internethasználatra",
            "Feszültség vagy ingerlékenység, ha nincs internetelérés",
            "Az internet használata rossz hangulat csökkentésére",
            "Az alvás háttérbe szorulása az internethasználat miatt",
            "A tanulás vagy munka elhanyagolása",
            "A családi vagy baráti kapcsolatok romlása",
            "A hobbik és egyéb tevékenységek háttérbe szorulása",
            "Titkolózás az online töltött időről",
            "A koncentráció romlása",
            "Akkor is folytatott internethasználat, ha az már problémát okoz",
            "Egyre több online idő igénye ugyanahhoz az elégedettségérzéshez",
            "Nyugtalanság internet nélkül",
            "A napi rutin felborulása",
            "Gyakoribb halogatás az internethasználat miatt",
            "Az offline tevékenységek iránti érdeklődés csökkenése",
            "A felelősségek elhanyagolása az internet miatt"
          ],
      },
  ]
});


pages.push({
    name: "negative",
    elements: [ 
      {
          type: "checkbox",
          name: "Éreztem már úgy hogy az internethasználatom mértéke befolyásolta a...",
          choices: [
            "koncentrációm",
            "figyelmem",
            "memóriám",
            {
              value: "kognitív",
              text: "kognitív funkcióm (gondolkodási képességem)"
            },
            {
              value: "frissességem / fáradtságom",
              text: ""
            },
            {
              value: "szorongásom mértékét",
              text: ""
            },
            {
              value: "hangulatom / érzelmi nyitottságom",
              text: ""
            },
            {
              value: "problémamegoldó képességem",
              text: ""
            }
          ],
          "showOtherItem": true,
          "otherText": "mást"
      },
  ]
});

pages.push({
    name: "szamterjedelem",
    elements: [
      {
        "type": "expression",
        "name": "Számterjedelem teszt. Jegyezze meg, és írja le a számot."
      }, 
      {
          type: "text",
          name: "1/1. szám"
      },
      {
        type: "text",
        name: "1/2. szám"
      },
      {
        type: "text",
        name: "1/3. szám"
      },
  ]
});

pages.push({
    name: "forditottszam",
    elements: [
      {
        "type": "expression",
        "name": "Fordított számterjedelem teszt. Jegyezze meg, és írja le a számot VISSZAFELÉ"
      }, 
      {
          type: "text",
          name: "2/1. szám"
      },
      {
        type: "text",
        name: "2/2. szám"
      },
      {
        type: "text",
        name: "2/3. szám"
      },
  ]
});

pages.push({
    name: "addenbrook2",
    elements: [
      {
        "type": "expression",
        "name": "Emlékszik még arra a három dologra, amit kértem, hogy ismételjen utánam?"
      }, 
      {
          type: "text",
          name: "1."
      },
      {
        type: "text",
        name: "2."
      },
      {
        type: "text",
        name: "3."
      },
  ]
});


const surveyJson = {
title: "Cholnoky fórum 03.12.",
description: "༼ つ ◕_◕ ༽つ A (*)-al jelölt mezők kitöltése kötelező. A kérdőív beküldése a (Complete) gombbal történik, a böngésző, a válasz sikeres mentéséről visszajelez. (´▽`ʃ♡ƪ)",
logo: "../favicon.png",
logoHeight: "60px",
pages: pages
};

const survey = new Survey.Model(surveyJson);

// 1) Create a stable response id once per respondent
function getOrCreateResponseId() {
  const key = "survey_response_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = (crypto?.randomUUID?.() ?? (Date.now() + "-" + Math.random().toString(16).slice(2)));
    localStorage.setItem(key, id);
  }
  return id;
}

const RESPONSE_ID = getOrCreateResponseId();

// 2) Your Apps Script Web App URL
const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbz33snvjsULA_fA6QseNSYtVsOVjAFSV99xoYXxAsD6aWhrchYvCeK1SdvmpBSkbdZuBw/exec";

// 3) Helper to POST partial data
async function postPartial(survey, reason) {
  const payload = {
    responseId: RESPONSE_ID,
    reason, // "page-change" | "complete" | etc.
    pageNo: survey.currentPageNo,
    pageName: survey.currentPage?.name ?? null,
    isComplete: survey.isCompleted,
    savedAt: new Date().toISOString(),
    data: survey.data
  };

  try {
    await fetch(ENDPOINT_URL, {
      method: "POST",
      mode: "no-cors", // common for Apps Script; response will be opaque
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Optional: store offline queue if you want reliability
    console.warn("Partial save failed:", e);
  }
}

// Fire when they move between pages
survey.onCurrentPageChanged.add((sender, options) => {
  postPartial(sender, "page-change");
});

// Also send on completion
survey.onComplete.add((sender) => {
  postPartial(sender, "complete");
});

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});