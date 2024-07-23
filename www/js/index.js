document.addEventListener("deviceready", onDeviceReady, false);
window.addEventListener('pageshow', onPageShow);

function onDeviceReady() {
    fetchContacts();
}
function onPageShow() {
    fetchContacts();
}

function fetchContacts() {
    navigator.contacts.find(
        ["id", "displayName", "phoneNumbers"],
        function(contacts) {
            // Sort contacts alphabetically by displayName
            contacts.sort((a, b) => {
                let nameA = (a.displayName || 'No Name').toUpperCase();
                let nameB = (b.displayName || 'No Name').toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            let list = document.getElementById('contact-list');
            list.innerHTML = '';
            contacts.forEach(contact => {
                let li = document.createElement('li');
                li.textContent = contact.displayName || 'No Name';
                let updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.onclick = () => navigateToUpdate(contact);
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteContact(contact);
                li.appendChild(updateButton);
                li.appendChild(deleteButton);
                list.appendChild(li);
            });
        },
        function(error) {
            alert('Error fetching contacts: ' + error.code);
        },
        { multiple: true }
    );
}

function navigateToAdd() {
    window.location = 'contact-form.html';
}

function navigateToUpdate(contact) {
    window.location = `contact-form.html?id=${contact.id}`;
}

function deleteContact(contact) {
    contact.remove(
        function() { alert('Contact deleted successfully!'); fetchContacts(); },
        function(error) { alert('Error deleting contact: ' + error.code); }
    );
}