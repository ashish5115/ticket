document.addEventListener('DOMContentLoaded', function () {
    // Function to populate the table with data from localStorage
    function populateTable() {
        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        const tableBody = document.querySelector('#request-table tbody');
        
        // Clear the table body first
        tableBody.innerHTML = '';

        requests.forEach((request, index) => {
            const row = tableBody.insertRow();
            
            // Add a checkbox in the first cell
            const checkboxCell = row.insertCell();
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'select';
            checkbox.value = index;
            checkboxCell.appendChild(checkbox);

            // Iterate over each key-value pair in the request object
            for (const key in request) {
                if (request.hasOwnProperty(key)) {
                    const cell = row.insertCell();
                    cell.textContent = request[key];
                }
            }
        });
    }

    populateTable(); // Call the function to populate the table on page load
});
