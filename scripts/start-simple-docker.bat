@echo off
echo Запуск Jekyll через Docker с упрощенной конфигурацией...
echo.
echo Если у вас не установлен Docker Desktop, установите его с сайта: https://www.docker.com/products/docker-desktop
echo.

echo Сборка и запуск с использованием упрощенного Dockerfile...
docker build -t jekyll-simple -f Dockerfile.simple .
docker run --rm -p 4000:4000 -p 35729:35729 -v %cd%:/srv/jekyll jekyll-simple

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 