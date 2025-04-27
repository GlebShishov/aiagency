@echo off
echo Запуск Jekyll через собственный Docker образ...
echo.

echo 1. Сборка собственного образа Jekyll...
docker build -t my-jekyll-custom -f Dockerfile.custom .

echo.
echo 2. Запуск Jekyll...
docker run --rm -it -p 4000:4000 -v "%CD%:/srv/jekyll" my-jekyll-custom

echo.
pause 