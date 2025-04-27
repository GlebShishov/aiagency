FROM ruby:3.1.4-alpine

WORKDIR /srv/jekyll

# Обновляем RubyGems до новой версии
RUN gem update --system

# Установка необходимых зависимостей
RUN apk add --no-cache build-base gcc cmake git

# Установка Jekyll и Bundler из Gemfile
COPY Gemfile /srv/jekyll/
RUN bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--livereload", "--host", "0.0.0.0"] 