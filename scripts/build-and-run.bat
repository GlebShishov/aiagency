@echo off
echo Сборка и запуск Jekyll через Docker (с нашим Dockerfile)...
echo.

echo 1. Сборка образа...
docker build -t my-jekyll .

echo.
echo 2. Запуск контейнера...
docker run --rm -it -p 4000:4000 -v %cd%:/srv/jekyll my-jekyll

echo.
pause 