// Build pages: for i = 1..18 do CTi, Instai, CT(i+18), SMi, TikToki (=> 90 pages)
const pages = [];

// If you prefer the instruction ONCE at the beginning, keep this intro page
pages.push({
  name: "intro",
  elements: [{
        "type": "expression",
         "name": "Kedves Résztvevő! \n\n"
  },{
        type: "text",
        name: "id",
        title: "Kérem adja meg az anonimizált kódját!",
        isRequired: true
    }
  ]
});

pages.push({
    name: "demography",
    elements: [ 
    {
        type: "text",
        name: "kor",
        title: "Kérem adja meg életkorát!",
        isRequired: true,
        inputType: "number",
        min: 1,
        max: 100
    }, {
        type: "radiogroup",
        name: "nem",
        title: "Kérem adja meg nemét",
        choices: [
          {
            value: "1",
            text: "Férfi"
          },
          {
            value: "2",
            text: "Nő"
          }
        ],
        showOtherItem: true,
        otherText: "Más (szabadon kitölthető)"
    }
  
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

// // 1) Create a stable response id once per respondent
// function getOrCreateResponseId() {
//   const key = "survey_response_id";
//   let id = localStorage.getItem(key);
//   if (!id) {
//     id = (crypto?.randomUUID?.() ?? (Date.now() + "-" + Math.random().toString(16).slice(2)));
//     localStorage.setItem(key, id);
//   }
//   return id;
// }

// const RESPONSE_ID = getOrCreateResponseId();

// // 2) Your Apps Script Web App URL
// const ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbz33snvjsULA_fA6QseNSYtVsOVjAFSV99xoYXxAsD6aWhrchYvCeK1SdvmpBSkbdZuBw/exec";

// // 3) Helper to POST partial data
// async function postPartial(survey, reason) {
//   const payload = {
//     responseId: RESPONSE_ID,
//     reason, // "page-change" | "complete" | etc.
//     pageNo: survey.currentPageNo,
//     pageName: survey.currentPage?.name ?? null,
//     isComplete: survey.isCompleted,
//     savedAt: new Date().toISOString(),
//     data: survey.data
//   };

//   try {
//     await fetch(ENDPOINT_URL, {
//       method: "POST",
//       mode: "no-cors", // common for Apps Script; response will be opaque
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });
//   } catch (e) {
//     // Optional: store offline queue if you want reliability
//     console.warn("Partial save failed:", e);
//   }
// }

// // Fire when they move between pages
// survey.onCurrentPageChanged.add((sender, options) => {
//   postPartial(sender, "page-change");
// });

// // Also send on completion
// survey.onComplete.add((sender) => {
//   postPartial(sender, "complete");
// });

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});