@echo off
echo ============================================
echo Прямой запуск Jekyll без Bundler
echo ============================================
echo.

echo Установка необходимых компонентов напрямую...
call gem install jekyll webrick
call gem install jekyll-feed jekyll-seo-tag

echo.
echo Запуск Jekyll напрямую...
call jekyll serve --livereload

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 