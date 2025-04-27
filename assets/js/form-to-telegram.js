/**
 * Скрипт для отправки данных из формы напрямую в Telegram бота через FormSubmit.co
 */

document.addEventListener('DOMContentLoaded', function() {
  // Проверяем, находимся ли мы на странице обработчика формы
  if (window.location.pathname.includes('/form-handler/')) {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Если параметры отсутствуют, перенаправляем на главную
    if (!urlParams.has('name') || !urlParams.has('email')) {
      window.location.href = window.siteConfig.baseUrl + '/';
      return;
    }
    
    // Собираем данные из URL параметров
    const formData = {
      name: urlParams.get('name') || 'Не указано',
      phone: urlParams.get('phone') || 'Не указано',
      email: urlParams.get('email') || 'Не указано',
      services: urlParams.get('services') || 'Не указано',
      description: urlParams.get('description') || 'Не указано',
      source: urlParams.get('source') || 'Не указано'
    };
    
    // Отправляем данные в Telegram
    sendToTelegram(formData)
      .then(response => {
        console.log('Сообщение успешно отправлено в Telegram:', response);
        // Перенаправляем на страницу с благодарностью
        window.location.href = window.siteConfig.baseUrl + '/thank-you/';
      })
      .catch(error => {
        console.error('Ошибка при отправке в Telegram:', error);
        // Перенаправляем на страницу с ошибкой
        window.location.href = window.siteConfig.baseUrl + '/error/';
      });
  }
});

/**
 * Функция для отправки данных формы в Telegram через FormSubmit.co
 * @param {Object} formData - данные формы
 * @returns {Promise} - промис с результатом отправки
 */
function sendToTelegram(formData) {
  return new Promise((resolve, reject) => {
    // Формируем текст сообщения для Telegram
    const message = `📋 *Новая заявка с сайта*\n\n` +
                    `👤 *Имя:* ${formData.name}\n` +
                    `📱 *Телефон:* ${formData.phone}\n` +
                    `📧 *Email:* ${formData.email}\n` +
                    `🔍 *Услуги:* ${formData.services}\n` +
                    `📝 *Описание:* ${formData.description}\n` +
                    `🔎 *Источник:* ${formData.source}`;
    
    // URL для отправки через FormSubmit.co
    const formSubmitUrl = 'https://formsubmit.co/ajax/' + window.siteConfig.formSubmissionEmail;
    
    // Отправляем данные через FormSubmit.co
    fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        services: formData.services,
        description: formData.description,
        source: formData.source,
        message: message,
        // Дополнительные параметры для FormSubmit.co
        _subject: 'Новая заявка с сайта AI Agency',
        _template: 'table',
        _captcha: 'false'
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      resolve({
        success: true,
        message: 'Сообщение успешно отправлено через FormSubmit.co'
      });
    })
    .catch(error => {
      reject({
        success: false,
        message: `Ошибка при отправке: ${error.message}`
      });
    });
  });
}
