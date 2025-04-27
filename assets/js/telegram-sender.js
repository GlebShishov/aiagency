/**
 * Скрипт для отправки данных из контактной формы напрямую в Telegram бот
 */

// Конфигурация Telegram бота
const TELEGRAM_CONFIG = {
  botToken: '7206856978:AAG4WV_K_M3MrsOXhFZ5Tfo14Wmowb8IQyY',
  chatId: '386565045'
};

/**
 * Функция для отправки данных формы в Telegram
 * @param {FormData} formData - данные формы
 * @returns {Promise} - промис с результатом отправки
 */
function sendToTelegram(formData) {
  return new Promise((resolve, reject) => {
    // Получаем данные из формы
    const name = formData.get('name') || 'Не указано';
    const phone = formData.get('phone') || 'Не указано';
    const email = formData.get('email') || 'Не указано';
    const description = formData.get('description') || 'Не указано';
    
    // Получаем выбранные услуги
    const services = formData.getAll('service[]');
    const servicesText = services.length > 0 ? services.join(', ') : 'Не выбраны';
    
    // Формируем текст сообщения для Telegram
    const message = `📋 *Новая заявка с сайта*\n\n` +
                    `👤 *Имя:* ${name}\n` +
                    `📱 *Телефон:* ${phone}\n` +
                    `📧 *Email:* ${email}\n` +
                    `🔍 *Услуги:* ${servicesText}\n` +
                    `📝 *Описание:* ${description}`;
    
    // Формируем URL для отправки сообщения через Telegram Bot API
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
    
    // Параметры запроса
    const params = {
      chat_id: TELEGRAM_CONFIG.chatId,
      text: message,
      parse_mode: 'Markdown'
    };
    
    // Отправляем запрос к Telegram Bot API
    fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.ok) {
        resolve({
          success: true,
          message: 'Сообщение успешно отправлено в Telegram'
        });
      } else {
        reject({
          success: false,
          message: `Ошибка Telegram API: ${data.description}`
        });
      }
    })
    .catch(error => {
      reject({
        success: false,
        message: `Ошибка при отправке: ${error.message}`
      });
    });
  });
}

// Экспортируем функцию для использования в других скриптах
window.sendToTelegram = sendToTelegram;
