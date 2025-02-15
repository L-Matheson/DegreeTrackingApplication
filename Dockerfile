FROM python:latest

WORKDIR /app

# # Install the correct SQLite version
# RUN apt-get update && apt-get install -y \
#     libsqlite3-dev \
#     sqlite3 \
#     build-essential

# # Rebuild Python to link to the updated SQLite
# RUN ln -sf /usr/lib/libsqlite3.so /usr/lib/libsqlite3.so.0 && \
#     python3 -m pip install --upgrade pip && \
#     python3 -m venv /venv
    
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "manage.py", "runserver", "0.0.0:8000"]
