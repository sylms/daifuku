FROM node:14 as builder

WORKDIR /workspace

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

# 末尾にスラッシュをつけない（末尾スラッシュの正規化がされていないため）
# VUE_APP_SYLMS_DAIFUKU_API_HOST=https://example-api
ARG VUE_APP_SYLMS_DAIFUKU_API_HOST

RUN yarn build

FROM nginx:1.21.1 as runner

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default_server.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /workspace/dist /usr/share/nginx/html
