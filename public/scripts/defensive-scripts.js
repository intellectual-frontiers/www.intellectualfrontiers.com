// defensive-scripts.js - Scripts specifically for defensive disclosure pages
// Loaded as ES6 module

// Citation Modal Functions
window.openCitationModal = function () {
    var modal = document.getElementById('citationModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

window.closeCitationModal = function () {
    var modal = document.getElementById('citationModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
};

// Function to update citation text by showing/hiding pre-generated citations
window.updateCitationStyle = function (style) {
    // Hide all citation texts
    const allCitations = document.querySelectorAll('.citation-text');
    allCitations.forEach(citation => {
        citation.classList.add('hidden');
    });

    // Show the selected citation
    const selectedCitation = document.getElementById(`citation-${style}`);
    if (selectedCitation) {
        selectedCitation.classList.remove('hidden');
    }

    // Update button states
    const buttons = document.querySelectorAll('[data-citation-style]');
    buttons.forEach(btn => {
        if (btn.dataset.citationStyle === style) {
            btn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
            btn.classList.add('bg-gray-800', 'hover:bg-gray-900');
        } else {
            btn.classList.remove('bg-gray-800', 'hover:bg-gray-900');
            btn.classList.add('bg-gray-600', 'hover:bg-gray-700');
        }
    });
};

// Copy Permalink Function
window.copyPermalink = function (event) {
    event.preventDefault();
    var permalink = window.location.href;

    // Try clipboard API first
    if (navigator.clipboard) {
        navigator.clipboard.writeText(permalink).then(function () {
            alert('Permalink copied to clipboard!');
            updateButton(event.target);
        }).catch(function () {
            // If clipboard API fails, try fallback
            fallbackCopy(permalink, event.target);
        });
    } else {
        // Use fallback for older browsers
        fallbackCopy(permalink, event.target);
    }
};

// Copy Citation Function with Alert
window.copyCitationText = function (event) {
    event.preventDefault();

    // Find the currently visible citation
    const visibleCitation = document.querySelector('.citation-text:not(.hidden)');
    if (!visibleCitation) {
        alert('No citation text found');
        return;
    }

    // Get text content without HTML tags for copying
    var citationText = visibleCitation.innerText || visibleCitation.textContent || '';

    // Simple approach - try clipboard API first
    if (navigator.clipboard) {
        navigator.clipboard.writeText(citationText).then(function () {
            alert('Citation copied to clipboard!');
            updateButton(event.target);
        }).catch(function () {
            // If clipboard API fails, try fallback
            fallbackCopy(citationText, event.target);
        });
    } else {
        // Use fallback for older browsers
        fallbackCopy(citationText, event.target);
    }
};

// Helper function for fallback copying
function fallbackCopy(text, button) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        var success = document.execCommand('copy');
        if (success) {
            alert('Content copied to clipboard!');
            updateButton(button);
        } else {
            alert('Failed to copy. Please try again.');
        }
    } catch (err) {
        alert('Failed to copy. Please try again.');
    }

    document.body.removeChild(textArea);
}

// Helper function to update button state after copying
function updateButton(button) {
    var actualButton = button.closest('button');
    if (!actualButton) return;

    var originalText = actualButton.innerHTML;
    actualButton.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Copied!';
    setTimeout(function () {
        actualButton.innerHTML = originalText;
    }, 2000);
}

// Initialize defensive disclosure specific event listeners
function initializeDefensiveScripts() {
    // Close modal when clicking outside
    document.addEventListener('click', (event) => {
        const modal = document.getElementById('citationModal');
        if (modal && event.target === modal) {
            closeCitationModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCitationModal();
        }
    });

    // Add click handler for Copy Permalink button if it exists
    const copyPermalinkButton = document.querySelector('button[onclick*="copyPermalink"]');
    if (copyPermalinkButton) {
        copyPermalinkButton.addEventListener('click', copyPermalink);
        // Remove the inline onclick to avoid double execution
        copyPermalinkButton.removeAttribute('onclick');
    }

    // Initialize citation style buttons
    const styleButtons = document.querySelectorAll('[data-citation-style]');
    styleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const style = button.dataset.citationStyle;
            updateCitationStyle(style);
        });
    });

    // Set default style as active (already visible, just need to set button state)
    updateCitationStyle('default');
}

// Since we're using type="module", the script is automatically deferred
// No need for DOMContentLoaded check - modules wait for DOM to be ready
initializeDefensiveScripts();