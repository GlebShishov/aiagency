FROM ruby as builder

# https://github.com/inadarei/alpine-jekyll/blob/master/Dockerfile
RUN gem install --no-document \
        redcarpet \
        kramdown \
        maruku \
        rdiscount \
        RedCloth \
        liquid \
        pygments.rb \
        sass \
        safe_yaml \
        jekyll \
        jekyll-paginate \
        jekyll-sass-converter \
        jekyll-sitemap \
        jekyll-feed \
        jekyll-redirect-from \
        webrick

RUN mkdir /srv/jekyll

WORKDIR /srv/jekyll

CMD jekyll
