function flamescalculator() {
    const n1 = document.getElementById("name1").value.trim();
    const n2 = document.getElementById("name2").value.trim();
    
    if (n1 === "" || n2 === "") {
        alert("Please enter both names first!");
        return;
    }

    // 1. Remove common letters
    let name1Arr = n1.toLowerCase().replace(/\s/g, '').split('');
    let name2Arr = n2.toLowerCase().replace(/\s/g, '').split('');
    
    name1Arr.forEach((char, i) => {
        let index = name2Arr.indexOf(char);
        if (index > -1) {
            name1Arr[i] = "";
            name2Arr[index] = "";
        }
    });

    // 2. Count remaining letters
    const count = (name1Arr.join('') + name2Arr.join('')).length;
    
    // 3. Get FLAMES result
    const flames = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"];
    const result = count === 0 ? "Soulmates" : flames[count % 6];

    // 4. Show the result in the popup
    document.getElementById("ResultTitle").innerText = result;
    document.getElementById("ResultText").innerText = `${n1} & ${n2} are meant to be: ${result}`;
    document.getElementById("popup").style.display = "flex";
}

function closepopup() {
    document.getElementById("popup").style.display = "none";
    // Optional: Clear inputs for next try
    document.getElementById("name1").value = "";
    document.getElementById("name2").value = "";
}
