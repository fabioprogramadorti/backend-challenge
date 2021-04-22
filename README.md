<p align="center">
 <a href="#-about-the-project">About</a> •
 <a href="#-running">Running</a> •
 <a href="#-using-the-api">Using the API</a> • 
 <a href="#-author">Author</a> • 
</p>

## 💻 About the project

This project was made using Node and MongoDB. The database is running on MongoDB Atlas - a cloud solution. Within the project was sent a Insomnia File for testing the api.

## 🚀 Running

In order to run the project, you must run the following commands inside the root file

```bash
yarn #to install the dependencies
yarn dev #to run the server
```

## 🎲 Using the API

**Creating survivor**

**_Path: /survivor_**

```bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
	"name": "Carl",
	"age": "50",
	"gender": "MALE",
	"last_location": {
		"lat": -88.2,
		"long": 25.7
	},
	"inventory": {
		"water": 10,
		"food": 80,
		"medication": 43,
		"ammunition": 120
	}
}' \
  http://localhost:3000/survivor # local URL

```

---

## 🦸 Author

<a href="https://github.com/fabioprogramadorti">
 <img style="border-radius: 50%;" src="./img/fabio.jpeg" width="100px;" alt=""/>
 <br />
 <sub><b>Fabio Santos</b></sub></a> <a href="https://github.com/fabioprogramadorti" title="Rocketseat">🚀</a>
 <br />

[![Gmail Badge](https://img.shields.io/badge/-fabioprogramadorti@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:fabioprogramadorti@gmail.com)](mailto:fabioprogramadorti@gmail.com)
