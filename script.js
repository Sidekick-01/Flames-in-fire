function calculate() {
    let n1 = document.getElementById("name1").value.toLowerCase().replace(/\s/g, "");
    let n2 = document.getElementById("name2").value.toLowerCase().replace(/\s/g, "");

    if (n1 === "" || n2 === "") return alert("Enter both names!");

    let a = n1.split("");
    let b = n2.split("");

    a.forEach((char, i) => {
        if (b.includes(char)) {
            a[i] = "";
            b[b.indexOf(char)] = "";
        }
    });

    let count = (a.join("") + b.join("")).length;
    let flames = ["Friends", "Love", "Affection", "Marriage", "Enemies", "Siblings"];
    
    while (flames.length > 1) {
        let index = (count % flames.length) - 1;
        if (index >= 0) {
            flames.splice(index, 1);
        } else {
            flames.splice(flames.length - 1, 1);
        }
    }

    showResult(flames[0]);
}
function saveAndShareResult() {
    const name1 = document.getElementById('name1').value.trim() || "Player1";
    const name2 = document.getElementById('name2').value.trim() || "Player2";
    const resultText = document.getElementById("res-text").innerText || "Friends";

   
    const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScK4nhp6fARTkRuN-gKt9ZyxUDnJ4lKiNWj3XQ8EUiJKpdfdg/formResponse";

    const prefilledForm = `${formBaseUrl}?entry.1838322606=${encodeURIComponent(name1)}&entry.295973339=${encodeURIComponent(name2)}&entry.1359058097=${encodeURIComponent(resultText)}`;
    
    
    window.open(prefilledForm, '_blank');

   
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}&result=${encodeURIComponent(resultText)}`;

    
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert(`✅ Done Chef!\n\n• Google Form opened (just click Submit to save publicly)\n• Sharable link copied to clipboard!\n\nAnyone who opens this link will see your exact FLAMES result with image 🔥`);
    }).catch(() => {
        alert(`✅ Google Form opened!\n\nSharable link:\n${shareUrl}`);
    });
}

function showResult(val) {
    let imgMap = {
        "Friends": "./assets/friends.png",
        "Love": "./assets/love.png",
        "Affection": "./assets/affection.png",
        "Marriage": "./assets/marriage.png",
        "Enemies": "./assets/enemies.png",
        "Siblings": "./assets/siblings.png"
    };

    const name1 = document.getElementById('name1').value.trim() || "Player 1";
    const name2 = document.getElementById('name2').value.trim() || "Player 2";

    document.getElementById("res-text").innerText = val;

    let fateText = `${name1} and ${name2} are ${val}`;
    document.getElementById("fate-text").innerText = fateText;

    document.getElementById("res-img").src = imgMap[val] || "";
    document.getElementById("popup-overlay").style.display = "flex";
}
function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
}


window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const name1 = params.get('name1');
    const name2 = params.get('name2');
    const result = params.get('result');

    if (name1 && name2 && result) {
        document.getElementById('name1').value = name1;
        document.getElementById('name2').value = name2;
        showResult(result);   
    }
});