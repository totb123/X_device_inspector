FROM python:3.11-alpine
RUN apk add gnupg

RUN mkdir -p /root/app
WORKDIR /root/app

COPY ./requirements.txt /root/app/requirements.txt
RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install --no-cache-dir --upgrade -r /root/app/requirements.txt
RUN pip install psycopg2

COPY . /root/app

ENV TZ="Europe/Moscow"

CMD [ "alembic", "upgrade", 'head']


