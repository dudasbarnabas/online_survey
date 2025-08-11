const SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxYZhFlyP_1Se90J5OzIaOKhT41BZ3SYdHwru-AFq4iYCYfxAQLrxBf4cvOD5qzYzrvVA/exec"; // ← put your endpoint here

const surveyJson = {
    elements: [{
        name: "FirstName",
        title: "Enter your first name:",
        type: "text"
    }, {
        name: "LastName",
        title: "Enter your last name:",
        type: "text"
    // }, {
    //       type: "image",
    //       name: "question2",
    //       imageLink: "img/CT1.png",
    //       imageFit: "cover",
    //       imageHeight: "contain",
    //       imageWidth: "50%",
    //       imageAlign: "center"
    }, {
        name: "third",
        title: "Enter something:",
        type: "text"
    }, {
          type: "rating",
          name: "nps_score",
          title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
          isRequired: true,
          rateCount: 11,
          rateMin: 0,
          rateMax: 10,
          minRateDescription: "(Most unlikely)",
          maxRateDescription: "(Most likely)"
    }]
};

const survey = new Survey.Model(surveyJson);

function alertResults(sender) {
    const payload = { timestamp: new Date().toISOString(), ...sender.data };

    // If your endpoint doesn't have CORS enabled yet, temporarily add:  // mode: "no-cors"
    fetch(SHEETS_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Thanks! Your response was saved ✅");
    })
    .catch((err) => {
        console.error(err);
        alert("Hmm, couldn't save due to a network error. Please try again 🙏");
    });
}

survey.onComplete.add(alertResults);

document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});

