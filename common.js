// Tüm test case objelerinde ortak kullanılan field id'leri
const TC_FIELDS = ["tc_header", "tc_status", "tc_suite", "tc_pass", "tc_author",
                    "tc_id", "tc_type", "tc_severity", "tc_priority",
                    "tc_reproducibility", "tc_directed_to", "tc_description",
                    "tc_objective", "tc_environment_information", "tc_pre_conditions",
                    "tc_steps", "tc_expected", "tc_actual", "tc_bugs", "tc_links", "tc_notes"];

function getAllTestCases() {
    return JSON.parse(localStorage.getItem("allTestCases")) || [];
}

function saveAllTestCases(list) {
    localStorage.setItem("allTestCases", JSON.stringify(list));
}

function generateId() {
    return "tc_" + Date.now();
}

function deleteTestCase(id) {
    let all = getAllTestCases();
    all = all.filter(tc => tc.id !== id);
    saveAllTestCases(all);
}

function getCurrentTestCaseId() {
    return localStorage.getItem("currentTestCaseId");
}

function setCurrentTestCaseId(id) {
    localStorage.setItem("currentTestCaseId", id);
}

function clearCurrentTestCaseId() {
    localStorage.removeItem("currentTestCaseId");
}