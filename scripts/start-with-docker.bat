@echo off
echo Запуск Jekyll через Docker...
echo.
echo Если у вас не установлен Docker Desktop, установите его с сайта: https://www.docker.com/products/docker-desktop
echo.
echo Пересборка контейнера для устранения возможных ошибок...

docker-compose build --no-cache
docker-compose up

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 