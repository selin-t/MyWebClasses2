let tc_header, tc_author, tc_id, tc_type;

// all of those values are null at first to prevent a possible crash while editing
tc_header = null; tc_author = null; tc_id = null; tc_type = null;


let tc_date, tc_severity, tc_priority, tc_reproducibility, tc_directed_to, tc_pass;

// natural values for all of those variables
tc_date = new Date().toLocaleDateString("tr-TR");
tc_severity = "None"; tc_priority = "None"; tc_reproducibility = "Always"; 
tc_directed_to = "Publishing"
tc_pass = true // true = pass, false = fail



// Return the values when page loads
function loadData() {
    const fields = ["tc_header", "tc_status", "tc_pass", "tc_author", 
                    "tc_id", "tc_type", "tc_severity", "tc_priority",
                    "tc_reproducibility", "tc_directed_to", "tc_description",
                    "tc_objective", "tc_environment_information", "tc_pre_conditions",
                    "tc_steps", "tc_expected", "tc_actual", "tc_bugs", "tc_links", "tc_notes"];
    
    fields.forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved !== null) {
            document.getElementById(id).value = saved;
        }
    });
}

// Save everything when save button is pressed
function saveData() {
    const fields = ["tc_header", "tc_status", "tc_pass", "tc_author", 
                    "tc_id", "tc_type", "tc_severity", "tc_priority",
                    "tc_reproducibility", "tc_directed_to", "tc_description",
                    "tc_objective", "tc_environment_information", "tc_pre_conditions",
                    "tc_steps", "tc_expected", "tc_actual", "tc_bugs", "tc_links", "tc_notes"];
    
    fields.forEach(id => {
        const value = document.getElementById(id).value;
        localStorage.setItem(id, value);
    });
    
    alert("Your Changes Got Saved");
}

// Deletes everything on the form
function resetForm() {
    const confirmed = confirm("Are you sure you want to delete everything on this form?");
    if (!confirmed) return;

    const fields = ["tc_header", "tc_status", "tc_pass", "tc_author", 
                    "tc_id", "tc_type", "tc_severity", "tc_priority",
                    "tc_reproducibility", "tc_directed_to", "tc_description",
                    "tc_objective", "tc_environment_information", "tc_pre_conditions",
                    "tc_steps", "tc_expected", "tc_actual", "tc_bugs", "tc_links", "tc_notes"];

    fields.forEach(id => {
        localStorage.removeItem(id);   // delete saved data
        document.getElementById(id).value = "";  // empty the input on the screen
    });

    alert("Your Form Got Reset");
}

// Opens a help manual when clicked
function help_TestSteps_Conclusion(){
    alert("Notes: You can write down all of your thoughts and other things you would like to add in this section");
}


// Load everything as soon as the page opens
window.onload = loadData;