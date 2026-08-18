window.onload = loadData;

function loadData() {
    document.getElementById("tc_date").innerHTML = "Date: " + new Date().toLocaleDateString("tr-TR");

    const currentId = getCurrentTestCaseId();
    if (!currentId) return; // new test case, form is empty

    const all = getAllTestCases();
    const tc = all.find(item => item.id === currentId);
    if (!tc) return;

    TC_FIELDS.forEach(id => {
        if (tc[id] !== undefined) {
            document.getElementById(id).value = tc[id];
        }
    });

    displayNumberedSteps();
}

function saveData() {
    const currentId = getCurrentTestCaseId();
    let all = getAllTestCases();

    const newData = {
        date: new Date().toLocaleDateString("tr-TR"),
        timestamp: Date.now()
    };

    TC_FIELDS.forEach(id => {
        newData[id] = document.getElementById(id).value;
    });

    if (currentId) {
        const index = all.findIndex(tc => tc.id === currentId);
        newData.id = currentId;
        if (index !== -1) {
            newData.timestamp = all[index].timestamp; // keep the old creation timestamp
            all[index] = newData;
        } else {
            all.push(newData);
        }
    } else {
        newData.id = generateId();
        all.push(newData);
        setCurrentTestCaseId(newData.id);
    }

    saveAllTestCases(all);
    alert("Your Changes Got Saved");
}

function resetForm() {
    const confirmed = confirm("Are you sure you want to delete everything on this form?");
    if (!confirmed) return;

    TC_FIELDS.forEach(id => {
        document.getElementById(id).value = "";
    });

    const currentId = getCurrentTestCaseId();
    if (currentId) {
        deleteTestCase(currentId);
        clearCurrentTestCaseId();
    }

    alert("Your Form Got Reset");
}

function help_TestSteps_Conclusion(){
    alert("Notes: You can write down all of your thoughts and other things you would like to add in this section");
}

function goToManager() {
    window.location.href = "file1.html";
}

function displayNumberedSteps() {
    const rawText = document.getElementById("tc_steps").value;
    const lines = rawText.split("\n").filter(line => line.trim() !== "");
    
    const ol = document.createElement("ol");
    lines.forEach(line => {
        const li = document.createElement("li");
        li.innerText = line;
        ol.appendChild(li);
    });
    
    document.getElementById("steps_display").innerHTML = "";
    document.getElementById("steps_display").appendChild(ol);
}