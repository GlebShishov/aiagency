@echo off
echo Запуск Jekyll локально...
echo.

rem Установка зависимостей
echo Установка зависимостей...
call bundle install

rem Запуск Jekyll
echo Запуск сервера Jekyll...
call bundle exec jekyll serve --livereload

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 