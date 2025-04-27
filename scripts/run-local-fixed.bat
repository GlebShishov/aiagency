@echo off
echo Запуск Jekyll локально (улучшенная версия)...
echo.

echo Проверка установки MSYS2...
where ridk > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ВНИМАНИЕ: ridk не найден. Возможно, у вас не установлен Ruby+Devkit.
    echo.
    echo Рекомендуемые шаги:
    echo 1. Скачайте и установите Ruby+Devkit с сайта https://rubyinstaller.org/downloads/
    echo    (выберите версию с пометкой "WITH DEVKIT")
    echo 2. Во время установки отметьте галочкой "MSYS2 development toolchain"
    echo 3. После установки запустите этот скрипт снова
    echo.
    pause
    exit /b 1
) else (
    echo ridk найден, проверяем MSYS2...
)

echo Убедимся, что MSYS2 установлен правильно...
call ridk enable
if %ERRORLEVEL% NEQ 0 (
    echo Запускаем установку MSYS2...
    call ridk install 3
)

echo.
echo Установка зависимостей...
call bundle config set --local path 'vendor/bundle'
call bundle install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Ошибка при установке зависимостей. Попробуем решить проблему:
    echo 1. Устанавливаем необходимые компоненты...
    call gem install jekyll bundler
    echo 2. Повторная установка зависимостей...
    call bundle install
)

echo.
echo Запуск сервера Jekyll...
call bundle exec jekyll serve --livereload

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 