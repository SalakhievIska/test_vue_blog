FROM python:3.7

WORKDIR /flask_crud

RUN apt-get update -y && apt-get install -y python3-pip python-dev

COPY . /flask_crud

RUN pip3 install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python3"]

CMD ["crud.py"]