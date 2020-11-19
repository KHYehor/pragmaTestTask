# pragmaTestTask

Необходимости в полноценном докер файле не было, поэтому перед запуском можно обойтись командой

``docker run --name pragma-mysql -e MYSQL_ROOT_PASSWORD=pragma -e MYSQL_DATABASE=Pragma  -p 3306:3306 mysql:latest --default-authentication-plugin=mysql_native_password``
  
Перед стартом сделать ``yarn install``

В виду того, что я поставил синхронизацию сущностей с БД, а не взаимодействие через миграции, то сразу запустим и преоект.

``yarn start:dev`` - или ``yarn build + yarn start:prod``

``http://localhost:3000/documentation`` -  ссылка на сваггер

Описание есть, но оно не слишком детальное.

P.S. - вставка в БД может показться относительно сложной, но это больше из-за связей.


