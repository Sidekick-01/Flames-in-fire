const ARCH_BACKEND = "https://engaged-cdna-displays-church.trycloudflare.com/save.php";
let serverOnline = false;

async function checkConnection() {
    try {
        await fetch(ARCH_BACKEND, { method: 'OPTIONS' });
        serverOnline = true;
        updateStatusUI(true);
    } catch (e) {
        serverOnline = false;
        updateStatusUI(false);
    }
}

function updateStatusUI(isOnline) {
    const dot = document.getElementById("status-dot");
    const text = document.getElementById("status-text");
    const desc = document.getElementById("detail-desc");

    if (isOnline) {
        dot.style.backgroundColor = "#00ff88";
        text.innerText = "Arch Server: LIVE";
        desc.innerHTML = "<b>Status: Connected.</b><br><br>Names are saved in my backend. I know you don't have the guts to tell your crush, so I'll keep the secret. Just between you, me, and my database.";
    } else {
        dot.style.backgroundColor = "#ff3b3b";
        text.innerText = "Arch Server: OFFLINE";
        desc.innerHTML = "<b>Status: Local Mode.</b><br><br>The database is disconnected. Whatever you type stays in this browser only. I'm blind right now, so your secrets are safe from even me.";
    }
}

function toggleDetails() {
    const notice = document.getElementById("secret-notice");
    notice.style.display = (notice.style.display === "none") ? "block" : "none";
}

function flamescalculator() {
    const n1 = document.getElementById("name1").value.trim();
    const n2 = document.getElementById("name2").value.trim();

    if (!n1 || !n2) return alert("Enter names!");

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
    const result = count === 0 ? "Soulmates" : flames[count % 6];

    document.getElementById("ResultTitle").innerText = result;
    document.getElementById("ResultText").innerText = "The fate between you two is: " + result;
    document.getElementById("popup").style.display = "flex";

    if (serverOnline) {
        fetch(ARCH_BACKEND, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name1: n1, name2: n2, result: result })
        });
    }
}

function closepopup() {
    document.getElementById("popup").style.display = "none";
}

checkConnection();


