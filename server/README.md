# blog
**Todo Fancy**
----
  a simple todo application using REST-API

## List of API Routers

Route | HTTP | Description | params | header | body | response | error
-------- | ------ | ----------- |------- | ----- | ------ | -------| -------
/articles | POST | create an article | none | {token} | {title, description, user} | 201 ok | none
/articles | GET  | read all article | none | none | none | 200 | none


