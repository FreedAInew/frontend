export class PasswordToggle {
    constructor(container) {
        this.input = container.querySelector('input');
        this.button = container.querySelector('.toggle-password');
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.toggle());
    }

    toggle() {
        const isActive = this.button.classList.toggle('active');
        this.input.type = isActive ? 'text' : 'password';
    }
}