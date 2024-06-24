FROM python:3.11-slim-buster

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0

RUN apt-get update && apt-get install -y libdmtx0b

COPY requirements.txt /root/app/
RUN pip install --no-cache-dir --upgrade -r /root/app/requirements.txt

COPY . /root/app
WORKDIR /root/app

CMD ["uvicorn", "main:app", "--port", "8091", "--host", "0.0.0.0"]