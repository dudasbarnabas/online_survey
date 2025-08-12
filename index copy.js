const SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxYZhFlyP_1Se90J5OzIaOKhT41BZ3SYdHwru-AFq4iYCYfxAQLrxBf4cvOD5qzYzrvVA/exec"; // ← put your endpoint here

const surveyJson = {
title: "Ingeranyag validáció",
description: "All fields with an asterisk (*) are required fields and must be filled out in order to process the information in strict confidentiality.",
logo: "https://surveyjs.io/Content/Images/examples/logo.png",
logoHeight: "60px",
pages: [
    {
    name: "page1",
    elements: [
    {
        "type": "expression",
        "name": "Kedves Kitöltő! \n A PTE ÁOK Magatartástudományi Intézet Kognitív Idegtudományi Tanszékének vizsgálatán vesz részt. "
    }
    ]}, {
    name: "page1",
    elements: [
    {
        type: "text",
        name: "kor",
        title: "Kérem adja meg életkorát!",
        isRequired: true,
        inputType: "number",
        min: 1,
        max: 100
    }
    ]}, {
    name: "page2",
    elements: [
    {
        type: "image",
        name: "CT1_img",
        imageLink: "img/CT1.png",
        imageFit: "cover",
        imageHeight: "contain",
        imageWidth: "100%",
        imageAlign: "center"
    }, {
        "type": "expression",
        "name": "Kérem értékelje a képet a megadott szempontok alapján. Valencia (mennyire kellemes vagy kellemetlen az adott kép), arousal (mennyire intenzív érzelmeket vált ki az adott kép) és realisztikusság (mennyire találja realisztikusnak az adott képet)."
    }, {
        type: "rating",
        name: "CT1_val",
        title: "Kellemetlen - Kellemes",
        isRequired: true,
        rateCount: 9,
        rateMin: 1,
        rateMax: 9,
        minRateDescription: "Kellemetlen/Negatív",
        maxRateDescription: "Kellemes/Pozitív"
    }, {
        type: "rating",
        name: "CT1_ar",
        title: "Nyugodt - Feszült",
        isRequired: true,
        rateCount: 9,
        rateMin: 1,
        rateMax: 9,
        minRateDescription: "Nyugodt/Békés",
        maxRateDescription: "Izgatott/Feszült"
    }, {
        type: "rating",
        name: "CT1_real",
        title: "Nem realisztikus - Realisztikus",
        isRequired: true,
        rateCount: 9,
        rateMin: 1,
        rateMax: 9,
        minRateDescription: "Egyáltalán nem realisztikus",
        maxRateDescription: "Realisztikus"
    }
    ]}, {
    name: "page3",
    elements: [
    {
        type: "image",
        name: "Insta1_img",
        imageLink: "img/Insta1.png",
        imageFit: "cover",
        imageHeight: "contain",
        imageWidth: "100%",
        imageAlign: "center"
    }, {
          "type": "expression",
          "name": "Kérem értékelje a képet a megadott szempontok alapján. Valencia (mennyire kellemes vagy kellemetlen az adott kép), arousal (mennyire intenzív érzelmeket vált ki az adott kép) és realisztikusság (mennyire találja realisztikusnak az adott képet)."
    }, {
        type: "rating",
        name: "Insta1_val",
        title: "Kellemetlen - Kellemes",
        isRequired: true,
        rateCount: 9,
        rateMin: 1,
        rateMax: 9,
        minRateDescription: "Kellemetlen/Negatív",
        maxRateDescription: "Kellemes/Pozitív"
    }, {
        type: "rating",
        name: "Insta1_ar",
        title: "Nyugodt - Feszült",
        isRequired: true,
        rateCount: 9,
        rateMin: 1,
        rateMax: 9,
        minRateDescription: "Nyugodt/Békés",
        maxRateDescription: "Izgatott/Feszült"
    }, {
        type: "rating",
        name: "Insta1_real",
        title: "Nem realisztikus - Realisztikus",
        isRequired: true,
        rateCount: 9,
        rateMin: 1,
        rateMax: 9,
        minRateDescription: "Egyáltalán nem realisztikus",
        maxRateDescription: "Realisztikus"
    }
    ]}, {
      name: "page3",
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
    }
]
};

const survey = new Survey.Model(surveyJson);

function alertResults(sender) {
  const payload = { timestamp: new Date().toISOString(), ...sender.data };

  fetch(SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  })
  .then(() => alert("Thanks! Your response was saved ✅"))
  .catch((err) => {
    console.error(err);
    alert("Hmm, couldn't save due to a network error. Please try again 🙏");
  });
}

survey.onComplete.add(alertResults);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});

