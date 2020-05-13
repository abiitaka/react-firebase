FROM node:latest
WORKDIR /usr/src/app

# 最初に「create-react-app」をインストールする
RUN npm install -g create-react-app
