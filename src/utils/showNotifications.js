export function showNotification(message, type = 'error') {
    let notification = document.createElement('div');
    notification.className = 'notification';

    if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else if (type === 'success') {
        notification.style.backgroundColor = '#4caf50';
    } else {
        notification.style.backgroundColor = '#333';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Mostra a notificação
    setTimeout(() => notification.classList.add('show'), 50);

    // Esconde depois de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 100);
    }, 10000);
}
