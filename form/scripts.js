document.addEventListener('DOMContentLoaded', function () {
    const typeChangeSelect = document.getElementById('type-change');
    const formDetails = document.getElementById('form-details');
    const saveOptions = document.getElementById('save-options');
    const promotionSection = document.getElementById('promotion-section');
    const currentClContainer = document.getElementById('current-cl-container');
    const compensationSection = document.getElementById('compensation-section');
    const retentionBonusSection = document.getElementById('retention-bonus-section');
    const ccaAllowanceSection = document.getElementById('cca-allowance-section');
    const proposedCompensationInput = document.getElementById('proposed-compensation');
    const currentCompensationInput = document.getElementById('current-compensation');
    const proposedIncreaseInput = document.getElementById('proposed-increase');
    const proposedEffectiveDatePromotionInput = document.getElementById('proposed-effective-date-promotion');
    const proposedEffectiveDateCompensationInput = document.getElementById('proposed-effective-date-compensation');
    const proposedEffectiveDateRetentionInput = document.getElementById('proposed-effective-date-retention');
    const proposedEffectiveDateCCAInput = document.getElementById('proposed-effective-date-cca');
    const clearButton = document.getElementById('clear-btn');
    const nextStepButton = document.getElementById('next-step-btn');
    const saveBtn = document.getElementById('save-btn');
    const savePdfButton = document.getElementById('save-pdf-btn');
    const saveCsvButton = document.getElementById('save-csv-btn');
    const totalRequests = document.getElementById('total-requests');
    const saveOptionsDiv = document.getElementById('save-options');

    function clearForm() {
        document.querySelectorAll('input, textarea').forEach(input => input.value = '');
        document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        calculateProposedIncrease();
        typeChangeSelect.dispatchEvent(new Event('change'));
    }

    function validateEffectiveDate(input) {
        const today = new Date();
        const minDate = new Date(today);
        const maxDate = new Date(today);
        minDate.setDate(today.getDate() + 45);
        maxDate.setDate(today.getDate() + 90);

        const inputDate = new Date(input.value);
        if (inputDate < minDate || inputDate > maxDate) {
            input.setCustomValidity('Proposed effective date must be between 45 to 90 days from today.');
        } else {
            input.setCustomValidity('');
        }
    }

    typeChangeSelect.addEventListener('change', function () {
        const selectedValue = this.value;
        formDetails.style.display = selectedValue ? 'block' : 'none';
        saveOptions.style.display = 'none';
        currentClContainer.style.display = 'none';
        promotionSection.style.display = 'none';
        compensationSection.style.display = 'none';
        retentionBonusSection.style.display = 'none';
        ccaAllowanceSection.style.display = 'none';

        switch (selectedValue) {
            case '1':
                promotionSection.style.display = 'block';
                compensationSection.style.display = 'block'; 
                currentClContainer.style.display = 'block';
                proposedEffectiveDatePromotionInput.style.display = 'block';
                proposedEffectiveDateCompensationInput.style.display = 'none'; 
                document.querySelector('label[for="proposed-effective-date-compensation"]').style.display = 'none'; 
                break;
            case '2':
                compensationSection.style.display = 'block';
                currentClContainer.style.display = 'block';
                proposedEffectiveDatePromotionInput.style.display = 'block';
                proposedEffectiveDateCompensationInput.style.display = 'block'; 
                currentClContainer.style.display = 'none'
                document.querySelector('label[for="current-cl-container"]').style.display = 'none'; 
                break;
            case '3':
                retentionBonusSection.style.display = 'block';
                break;
            case '4':
                ccaAllowanceSection.style.display = 'block';
                break;
        }
    });

    function calculateProposedIncrease() {
        const currentCompensation = parseFloat(currentCompensationInput.value) || 0;
        const proposedCompensation = parseFloat(proposedCompensationInput.value) || 0;
        if (currentCompensation > 0 && proposedCompensation > 0) {
            const increasePercentage = ((proposedCompensation - currentCompensation) / currentCompensation) * 100;
            proposedIncreaseInput.value = increasePercentage.toFixed(2);
        } else {
            proposedIncreaseInput.value = '';
        }
    }

    currentCompensationInput.addEventListener('input', calculateProposedIncrease);
    proposedCompensationInput.addEventListener('input', calculateProposedIncrease);

    function clearAllRecords() {
        clearForm();
        calculateProposedIncrease();
    }

    clearButton.addEventListener('click', clearAllRecords);

    let totalRequestCount = 0;

    function saveRequest() {
        const formData = new FormData(document.querySelector('.form-container'));
        const requestDetails = {};
        formData.forEach((value, key) => {
            requestDetails[key] = value;
        });
        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        requests.push(requestDetails);
        localStorage.setItem('requests', JSON.stringify(requests));
        totalRequestCount++;
        totalRequests.textContent = `Total Request Recorded: ${totalRequestCount}`;
    }

    saveBtn.addEventListener('click', () => {
        // Show the save options div
        saveOptionsDiv.style.display = 'block';
    });

    // For Save as PDF
document.getElementById('save-pdf-btn').addEventListener('click', function() {
    var doc = new jsPDF();
    var yOffset = 10;

    // Loop through form fields and add them to the PDF
    document.querySelectorAll('.form-group').forEach(function(field) {
        var label = field.querySelector('label').textContent;
        var value = field.querySelector('input, select, textarea').value;
        doc.text(label + ': ' + value, 10, yOffset);
        yOffset += 10; // Increment y-offset for next field
    });

    // Save the PDF
    doc.save('form_data.pdf');
});

// For Save as CSV
document.getElementById('save-csv-btn').addEventListener('click', function() {
    var csvContent = "data:text/csv;charset=utf-8,";
    var fields = [];

    // Loop through form fields and construct CSV content
    document.querySelectorAll('.form-group').forEach(function(field) {
        var label = field.querySelector('label').textContent;
        var value = field.querySelector('input, select, textarea').value;
        fields.push(label + ': ' + value);
    });

    // Join fields array with commas to create CSV rows
    csvContent += fields.join('\n');

    // Create a download link and simulate click to trigger download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "form_data.csv");
    document.body.appendChild(link);
    link.click();
});

    proposedEffectiveDatePromotionInput.addEventListener('change', function () {
        validateEffectiveDate(this);
    });

    proposedEffectiveDateCompensationInput.addEventListener('change', function () {
        validateEffectiveDate(this);
    });

    proposedEffectiveDateRetentionInput.addEventListener('change', function () {
        validateEffectiveDate(this);
    });

    proposedEffectiveDateCCAInput.addEventListener('change', function () {
        validateEffectiveDate(this);
    });

    clearForm();
});
