@echo off
echo Запуск Jekyll через Docker (альтернативный подход)...
echo.

docker run --rm -it -p 4000:4000 -v %cd%:/usr/src/app -w /usr/src/app ruby:2.7-alpine sh -c "apk add --no-cache build-base gcc cmake git && gem install jekyll bundler && jekyll serve --host 0.0.0.0"

echo.
pause 