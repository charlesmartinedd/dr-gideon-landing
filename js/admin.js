// Admin Panel JavaScript

class AdminPanel {
    constructor() {
        this.storageKey = 'dr_giddeon_emails';
        this.init();
    }

    init() {
        this.loadEmails();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const exportBtn = document.getElementById('exportBtn');
        const clearBtn = document.getElementById('clearBtn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportToCSV());
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllEmails());
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

    loadEmails() {
        const emails = this.getEmails();
        this.updateStats(emails);
        this.renderTable(emails);
    }

    updateStats(emails) {
        const totalCount = document.getElementById('totalCount');
        const todayCount = document.getElementById('todayCount');
        const weekCount = document.getElementById('weekCount');

        if (!totalCount || !todayCount || !weekCount) return;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const todayEmails = emails.filter(email => {
            const emailDate = new Date(email.timestamp);
            const emailDay = new Date(emailDate.getFullYear(), emailDate.getMonth(), emailDate.getDate());
            return emailDay.getTime() === today.getTime();
        });

        const weekEmails = emails.filter(email => {
            const emailDate = new Date(email.timestamp);
            return emailDate >= weekAgo;
        });

        totalCount.textContent = emails.length;
        todayCount.textContent = todayEmails.length;
        weekCount.textContent = weekEmails.length;

        // Animate numbers
        this.animateValue(totalCount, 0, emails.length, 1000);
        this.animateValue(todayCount, 0, todayEmails.length, 1000);
        this.animateValue(weekCount, 0, weekEmails.length, 1000);
    }

    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(start + (end - start) * progress);
            element.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    renderTable(emails) {
        const tbody = document.getElementById('emailTableBody');
        if (!tbody) return;

        // Clear existing content
        tbody.innerHTML = '';

        if (emails.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-state">
                    <td colspan="4">
                        <div class="empty-state-content">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="30" stroke="#e2e8f0" stroke-width="2"/>
                                <path d="M32 24V32M32 40H32.02" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                            <p>No email addresses collected yet</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        // Sort by timestamp (newest first)
        const sortedEmails = [...emails].sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        // Render rows
        sortedEmails.forEach((email, index) => {
            const date = new Date(email.timestamp);
            const row = document.createElement('tr');
            row.style.animation = `slideIn 0.3s ease ${index * 0.05}s backwards`;
            row.innerHTML = `
                <td><strong>${this.escapeHtml(email.name)}</strong></td>
                <td>${this.escapeHtml(email.email)}</td>
                <td>${this.formatDate(date)}</td>
                <td>${this.formatTime(date)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    exportToCSV() {
        const emails = this.getEmails();

        if (emails.length === 0) {
            alert('No emails to export');
            return;
        }

        // Create CSV content
        const headers = ['Name', 'Email', 'Date', 'Time', 'Timestamp'];
        const rows = emails.map(email => {
            const date = new Date(email.timestamp);
            return [
                email.name,
                email.email,
                this.formatDate(date),
                this.formatTime(date),
                email.timestamp
            ];
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `dr_giddeon_emails_${Date.now()}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    clearAllEmails() {
        if (!confirm('Are you sure you want to delete all email addresses? This action cannot be undone.')) {
            return;
        }

        localStorage.removeItem(this.storageKey);
        this.loadEmails();

        // Show success message
        this.showNotification('All email addresses have been cleared', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#667eea'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    new AdminPanel();
});
