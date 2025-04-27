@echo off
echo ============================================
echo Исправление проблемы с ffi для Jekyll на Windows
echo ============================================
echo.

echo Очистка предыдущей установки...
call bundle clean --force
if exist "vendor\bundle" (
    echo Удаление кеша...
    rmdir /s /q "vendor\bundle"
)

echo.
echo Установка нужных гемов напрямую...
call gem install ffi -v 1.15.0 --platform=ruby

echo.
echo Настройка Bundler для пропуска установки ffi...
set BUNDLE_FORCE_RUBY_PLATFORM=1

echo.
echo Установка зависимостей проекта...
call bundle config set --local path 'vendor/bundle'
call bundle install --without development test

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Пробуем альтернативный подход...
    echo.
    
    echo Установка необходимых компонентов вручную...
    call gem install bundler jekyll
    call gem install webrick -v 1.7.0
    call gem install ffi -v 1.15.0
    call gem install sassc -v 2.1.0
    call gem install jekyll-feed -v 0.16.0
    call gem install jekyll-seo-tag -v 2.7.1
    
    echo.
    echo Запуск Jekyll напрямую...
    call jekyll serve --livereload
) else (
    echo.
    echo Зависимости успешно установлены. Запуск сервера...
    call bundle exec jekyll serve --livereload
)

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 