FROM public.ecr.aws/lambda/python:3.11

RUN yum install -y gcc-c++ java-1.8.0-openjdk-devel

COPY requirements.txt ${LAMBDA_TASK_ROOT}


RUN pip install -r requirements.txt

COPY lambda_function.py ${LAMBDA_TASK_ROOT}


CMD [ "lambda_function.handler" ]