@echo off
echo Остановка существующих контейнеров...
docker-compose down

echo Удаление Docker-образов и кеша...
docker-compose rm -f
docker system prune -f --volumes

echo Пересборка и запуск контейнера с нуля...
docker-compose build --no-cache
docker-compose up

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 