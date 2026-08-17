window.onload = renderList;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('input[name="filter_option"]').forEach(radio => {
        radio.addEventListener("change", renderList);
    });
    document.getElementById("sort_by").addEventListener("change", renderList);
});

function renderList() {
    let all = getAllTestCases();

    const filter = document.querySelector('input[name="filter_option"]:checked');
    const filterValue = filter ? filter.value : "ALL";

    if (filterValue === "PASSED") {
        all = all.filter(tc => tc.tc_pass === "PASS");
    } else if (filterValue === "FAILED") {
        all = all.filter(tc => tc.tc_pass === "FAIL");
    } else if (filterValue !== "ALL") {
        all = all.filter(tc => tc.tc_status === filterValue);
    }

    const sortBy = document.getElementById("sort_by").value;
    const priorityOrder = { "High": 3, "Medium": 2, "Low": 1, "": 0 };

    if (sortBy === "PRIORITY") {
        all.sort((a, b) => (priorityOrder[b.tc_priority] || 0) - (priorityOrder[a.tc_priority] || 0));
    } else if (sortBy === "SEVERITY") {
        all.sort((a, b) => (priorityOrder[b.tc_severity] || 0) - (priorityOrder[a.tc_severity] || 0));
    } else if (sortBy === "DATE_new_to_old") {
        all.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === "DATE_old_to_new") {
        all.sort((a, b) => a.timestamp - b.timestamp);
    }

    const container = document.getElementById("tc_list");
    container.innerHTML = "";

    if (all.length === 0) {
        container.innerHTML = "<p>No test cases were found</p>";
        container.className = "containerText";
        return;
    }

    all.forEach(tc => {
        const item = document.createElement("div");
        item.className = "tc-list-item";

        const infoSpan = document.createElement("span");
        infoSpan.innerText = `${tc.tc_header || "Header: None"},  ${"Status: "+tc.tc_status || "Status: None"},  ${"ID: "+tc.tc_id || "ID: None"},  ${"Date: "+tc.date || "Date: None"}`;
        
        
        infoSpan.onclick = () => openTestCase(tc.id);
        infoSpan.style.cursor = "pointer";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "DELETE";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = (event) => {
            event.stopPropagation(); // tıklama listedeki item'a değil, sadece butona etki etsin
            handleDelete(tc.id);
        };

        item.appendChild(infoSpan);
        item.appendChild(deleteBtn);
        container.appendChild(item);
    });
}

function handleDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this test case?");
    if (!confirmed) return;

    deleteTestCase(id);

    // Eğer silinen kayıt o an "açık" olan kayıtsa, referansı da temizle
    if (getCurrentTestCaseId() === id) {
        clearCurrentTestCaseId();
    }

    renderList(); // listeyi yeniden çiz
}

function openTestCase(id) {
    setCurrentTestCaseId(id);
    window.location.href = "file2.html";
}

function createNewTestCase() {
    clearCurrentTestCaseId();
    window.location.href = "file2.html";
}