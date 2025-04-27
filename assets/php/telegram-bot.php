<?php
/**
 * Скрипт для отправки данных из контактной формы в Telegram бот
 */

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Получение данных из формы
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : 'Не указано';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : 'Не указано';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : 'Не указано';
$description = isset($_POST['description']) ? htmlspecialchars($_POST['description']) : 'Не указано';

// Получение выбранных услуг
$services = [];
if (isset($_POST['service']) && is_array($_POST['service'])) {
    foreach ($_POST['service'] as $service) {
        $services[] = htmlspecialchars($service);
    }
}
$servicesText = !empty($services) ? implode(', ', $services) : 'Не выбраны';

// Формирование текста сообщения для Telegram
$message = "📋 *Новая заявка с сайта*\n\n";
$message .= "👤 *Имя:* $name\n";
$message .= "📱 *Телефон:* $phone\n";
$message .= "📧 *Email:* $email\n";
$message .= "🔍 *Услуги:* $servicesText\n";
$message .= "📝 *Описание:* $description\n";

// Добавление информации о файле, если он был загружен
$fileInfo = '';
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $fileName = $_FILES['file']['name'];
    $fileSize = round($_FILES['file']['size'] / 1024); // размер в КБ
    $fileInfo = "\n📎 *Прикреплен файл:* $fileName ($fileSize КБ)";
    $message .= $fileInfo;
}

// Конфигурация Telegram бота
$botToken = '7206856978:AAG4WV_K_M3MrsOXhFZ5Tfo14Wmowb8IQyY'; // ТОКЕН БОТА - оставляем пустым, пользователь добавит сам
$chatId = '386565045';   // ID ЧАТА - оставляем пустым, пользователь добавит сам

// Проверка наличия токена и ID чата
if (empty($botToken) || empty($chatId)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Bot configuration is missing']);
    exit;
}

// Отправка сообщения в Telegram
$telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMessage";
$postData = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'Markdown'
];

// Инициализация cURL
$ch = curl_init($telegramApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Выполнение запроса
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Проверка результата
if ($httpCode === 200) {
    // Если файл был загружен, отправляем его отдельным сообщением
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        // Здесь можно добавить код для отправки файла через Telegram API
        // Но это требует дополнительной обработки и может быть реализовано позже
    }
    
    echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка при отправке сообщения в Telegram']);
}
