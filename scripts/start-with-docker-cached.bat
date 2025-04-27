@echo off
echo Запуск Jekyll через Docker (используя кешированные образы)...
echo.
echo Если у вас не установлен Docker Desktop, установите его с сайта: https://www.docker.com/products/docker-desktop
echo.

docker-compose up

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 