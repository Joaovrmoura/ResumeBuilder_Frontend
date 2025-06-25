import { showNotification } from './showNotifications.js';

export function handleApiError(responseData) {
    if (!responseData.success) {
        if (Array.isArray(responseData.message)) {
            const messages = responseData.message.map(e => `• ${e.msg}`).join('\n');
            showNotification("Erros de validação:\n" + messages );
        } else {
            showNotification(responseData.message);
        }
    }
}
