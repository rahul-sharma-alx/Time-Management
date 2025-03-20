
    function toggleDropdown() {
        const dropdown = document.getElementById('dropdownMenu');
        dropdown.classList.toggle('hidden');
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', (e) => {
        const dropdown = document.getElementById('dropdownMenu');
        if (!e.target.closest('.profile-container')) {
            dropdown.classList.add('hidden');
        }
    });
