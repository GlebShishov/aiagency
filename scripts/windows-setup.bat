@echo off
echo ============================================
echo Настройка среды для Jekyll на Windows
echo ============================================
echo.

echo Проверка установки Ruby...
where ruby > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Ruby не установлен!
    echo.
    echo Пожалуйста, установите Ruby+Devkit с сайта:
    echo https://rubyinstaller.org/downloads/
    echo.
    echo Выберите версию с отметкой "WITH DEVKIT"
    echo После установки запустите этот скрипт заново.
    echo.
    pause
    exit /b 1
) else (
    ruby -v
    echo Ruby установлен успешно.
)

echo.
echo Установка необходимых компонентов MSYS2...
call ridk install 3
if %ERRORLEVEL% NEQ 0 (
    echo Предупреждение: Возможно, не удалось установить MSYS2.
    echo Это может вызвать проблемы при компиляции нативных расширений.
    echo.
    echo Попробуйте запустить команду "ridk install" вручную.
)

echo.
echo Установка необходимых гемов...
call gem install bundler jekyll
if %ERRORLEVEL% NEQ 0 (
    echo Ошибка при установке bundler и jekyll.
    echo.
    pause
    exit /b 1
)

echo.
echo Настройка Bundler для использования локальной папки...
call bundle config set --local path 'vendor/bundle'

echo.
echo Установка зависимостей проекта...
call bundle install
if %ERRORLEVEL% NEQ 0 (
    echo Ошибка при установке зависимостей.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo Настройка завершена успешно!
echo.
echo Для запуска сайта используйте:
echo scripts\run-local-fixed.bat
echo ============================================
echo.
pause 