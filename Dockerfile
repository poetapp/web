FROM node:10.12.0

RUN apt-get update && apt-get install -y rsync \
  gcc-5 \
  g++-5 \
  && rm -rf /var/lib/apt/lists/* \
  && rm /etc/apt/sources.list.d/unstable.list

RUN echo 'PS1="\u@${POET_SERVICE:-noService}:\w# "' >> ~/.bashrc

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . /usr/src/app/

RUN npm run build

CMD [ "npm", "run", "start" ]

