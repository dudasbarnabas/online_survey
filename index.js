const SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxYZhFlyP_1Se90J5OzIaOKhT41BZ3SYdHwru-AFq4iYCYfxAQLrxBf4cvOD5qzYzrvVA/exec"; // ← put your endpoint here

const makePage = (label, imgPrefix, idx) => ({
  name: `${label}${idx}_page`,
  elements: [
    // (optional) show the instruction on every page — or remove this block
    {
      type: "expression",
      name:
        "Kérem értékelje a képet a megadott szempontok alapján. Valencia (mennyire kellemes vagy kellemetlen az adott kép), arousal (mennyire intenzív érzelmeket vált ki az adott kép) és realisztikusság (mennyire találja realisztikusnak az adott képet)."
    },
    {
      type: "image",
      name: `${label}${idx}_img`,
      imageLink: `img/${imgPrefix}${idx}.png`,
      imageFit: "cover",
      imageHeight: "contain", // keep as you had it
      imageWidth: "100%",
      imageAlign: "center"
    },
    {
      type: "rating",
      name: `${label}${idx}_val`,
      title: "Kellemetlen - Kellemes",
      isRequired: true,
      rateCount: 9, rateMin: 1, rateMax: 9,
      minRateDescription: "Kellemetlen/Negatív",
      maxRateDescription: "Kellemes/Pozitív"
    },
    {
      type: "rating",
      name: `${label}${idx}_ar`,
      title: "Nyugodt - Feszült",
      isRequired: true,
      rateCount: 9, rateMin: 1, rateMax: 9,
      minRateDescription: "Nyugodt/Békés",
      maxRateDescription: "Izgatott/Feszült"
    },
    {
      type: "rating",
      name: `${label}${idx}_real`,
      title: "Nem realisztikus - Realisztikus",
      isRequired: true,
      rateCount: 9, rateMin: 1, rateMax: 9,
      minRateDescription: "Egyáltalán nem realisztikus",
      maxRateDescription: "Realisztikus"
    }
  ]
});

// Build pages: for i = 1..18 do CTi, Instai, CT(i+18), SMi, TikToki (=> 90 pages)
const pages = [];

// If you prefer the instruction ONCE at the beginning, keep this intro page
pages.push({
  name: "intro",
  elements: [{
        "type": "expression",
         "name": "Kedves Kitöltő! \n\nA PTE ÁOK Magatartástudományi Intézet Kognitív Idegtudományi Tanszékének vizsgálatán vesz részt. \nA kérdőív kitöltésével kutatásunkat segíti, melyben az okostelefonok és a közösségi média használat emberi magatartásra gyakorolt hatásait vizsgáljuk. \nA kitöltés anonim, az eredményeket a kutatásunk során használt ingeranyag összeállításában fogjuk felhasználni. \nEzt követően különböző képeket mutatunk be. A bemutatott képeket kérjük értékelje a valencia (mennyire kellemes vagy kellemetlen az adott kép), arousal (mennyire intenzív érzelmeket vált ki az adott kép) és realisztikusság (mennyire találja realisztikusnak az adott képet) mentén egy-egy kilencfokú skálán, ahol:  \n\nValencia: \n1=kellemetlen/negatív  \n5=semleges  \n9=kellemes/pozitív  \n\nArousal:  \n1=nyugodt/békés  \n5=semleges  \n9=izgatott/feszült  \n\nRealisztikusság  \n1= Egyáltalán nem reális  \n9= Reális  \n\nSegítségét hálásan köszönjük!"
  }]
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

pages.push({ //BSMAS
      name: "bsmas",
      elements: [
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
    });

for (let i = 1; i <= 18; i++) {
  pages.push(makePage("CT", "CT", i));            // CT1..CT18
  pages.push(makePage("Insta", "Insta", i));      // Insta1..Insta18
  pages.push(makePage("CT", "CT", i + 18));       // CT19..CT36
  pages.push(makePage("SM", "SM", i));            // SM1..SM18
  pages.push(makePage("TikTok", "TikTok", i));    // TikTok1..TikTok18
}

const surveyJson = {
title: "Ingeranyag validáció",
description: "༼ つ ◕_◕ ༽つ A (*)-al jelölt mezők kitöltése kötelező. A kérdőív beküldése a (Complete) gombbal történik, a böngésző, a válasz sikeres mentéséről visszajelez. (´▽`ʃ♡ƪ)",
logo: "favicon.png",
logoHeight: "60px",
pages: pages
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

