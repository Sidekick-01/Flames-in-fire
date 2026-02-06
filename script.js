/function calculate() {
    let n1 = document.getElementById("name1").value.toLowerCase().replace(/\s/g, "");
    let n2 = document.getElementById("name2").value.toLowerCase().replace(/\s/g, "");

    if (n1 === "" || n2 === "") return alert("Enter names!");

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

function showResult(val) {
    let imgMap = {
        "Friends": "./assets/friends.png",
        "Love": "./assets/love.png",
        "Affection": "./assets/affection.png",
        "Marriage": "./assets/marriage.png",
        "Enemies": "./assets/enemies.png",
        "Siblings": "./assets/siblings.png"
    };

    document.getElementById("res-text").innerText = val;
    document.getElementById("res-img").src = imgMap[val];
    document.getElementById("popup-overlay").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
}



