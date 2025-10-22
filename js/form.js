// Simple Email Collection System for Dr. Gideon Landing Page

class EmailCollector {
    constructor() {
        this.storageKey = 'dr_giddeon_emails';
        this.form = document.getElementById('emailForm');
        this.successMessage = document.getElementById('successMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            timestamp: new Date().toISOString(),
            id: this.generateId()
        };

        // Validate email
        if (!this.validateEmail(formData.email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // Validate name
        if (formData.name.length < 2) {
            this.showError('Please enter your full name');
            return;
        }

        // Save email to localStorage
        this.saveEmail(formData);

        // Show success message and scroll to resources
        this.showSuccess();

        // Scroll to resources after 1 second
        setTimeout(() => {
            document.getElementById('resources').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    saveEmail(data) {
        try {
            let emails = this.getEmails();

            // Check for duplicate
            const isDuplicate = emails.some(e => e.email === data.email);
            if (!isDuplicate) {
                emails.push(data);
                localStorage.setItem(this.storageKey, JSON.stringify(emails));
            }
        } catch (error) {
            console.error('Error saving email:', error);
        }
    }

    getEmails() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error retrieving emails:', error);
            return [];
        }
    }

    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.style.display = 'flex';
    }

    showError(message) {
        // Remove existing error messages
        const existingError = this.form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: #fee2e2;
            border-radius: 8px;
            color: #991b1b;
            font-weight: 600;
            margin-top: 1rem;
            animation: slideIn 0.3s ease;
        `;
        errorDiv.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>${message}</p>
        `;

        this.form.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

// Initialize the email collector
document.addEventListener('DOMContentLoaded', () => {
    new EmailCollector();
});
