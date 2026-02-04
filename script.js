const ARCH_BACKEND = "LINK CLOUDFLARED ";
let serverOnline = false;

async function checkConnection() {
    try {
        await fetch(ARCH_BACKEND, { method: 'OPTIONS' });
        serverOnline = true;
        console.log("Arch Linux MariaDB:Connected");
        if (document.getElementById("status-text")) {
            document.getElementById("status-text").innerText = "Database Online - Results Secured";
        }
    } catch (e) {
        serverOnline = false;
        console.log("Arch Linux MariaDB: offline (stealth Mode)");
    }
}
checkConnection();


function flamescalculator() {
    const n1 = document.getElementById("name1").value.trim();
    const n2 = document.getElementById("name2").value.trim();

    if (!n1 || !n2) {
        alert("Please enter both names!");
        return;
    }

    const result = calculate(n1, n2);
    showPopup(result);

  
    if (serverOnline) {
        saveToDatabase(n1, n2, result);
    }
}

function calculate(n1, n2) {
    let name1 = n1.toLowerCase().replace(/\s/g, '').split('');
    let name2 = n2.toLowerCase().replace(/\s/g, '').split('');

    name1.forEach((char, i) => {
        let index = name2.indexOf(char); 
        if (index > -1) {
            name1[i] = "";
            name2[index] = "";
        }
    });

    const count = (name1.join('') + name2.join('')).length;
    const flames = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"];
    
    return count === 0 ? "Soulmates" : flames[count % 6];
}

function saveToDatabase(name1, name2, result) {
    fetch(ARCH_BACKEND, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name1: name1,
            name2: name2,
            result: result
        })
    })
    .then(response => console.log("Data sent to Arch Linux"))
    .catch(error => console.error("Save failed:", error));
}

function showPopup(result) {

    const popup = document.getElementById("popup"); 
    

    document.getElementById("ResultTitle").innerText = result; 
    document.getElementById("ResultText").innerText = "The fate between you two is: " + result;
    
    popup.style.display = "flex";
}

function closepopup() {
    document.getElementById("popup").style.display = "none";
}