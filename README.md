# Pwipper-API

Pwipper-API is a tokopedia play clone. In this current state, this API only runs in local host.




###  API Structure
This Pwipper-API is RESTful API stands for Representational State Transfer API. It is an architectural style for designing web services. RESTful APIs are based on the HTTP protocol and use URIs to identify resources.

### API Architecture
This API is using clean architecture. Clean architecture is a software design pattern that prioritizes the separation of concerns and separates an application into distinct layers. By applying Clean Architecture to API development, you can build scalable, maintainable, and testable APIs that are easier to manage and evolve.

The core of Clean Architecture is the domain/usecase/business layer. The domain layer represents the core business logic of the application. It is independent of any specific technology or platform, and it should be easy to test.

![App Screenshot](https://playbook.hackney.gov.uk/API-Playbook/assets/images/clean_architecture-5cfe76b73f45e6a45082570315a20e7b.png)






## Run Locally

Clone the project

```bash
  git clone https://github.com/ovisannn/pwipper-api
```

Go to the project directory

```bash
  cd pwipper-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start dev
```


## API Reference

### General Response Body

Success response body :
```
{
    meta :{
      status : number,
      message : string
    }
    data:{
      key : object
    }
}
```

Error Response body : 
```
{
  meta :{
    status : number,
    message : string
  }
}
```

### Video Thumbnail List
It get all video in databse then return only _id, image thumbnail Url, and video url.
```http
  GET /video/thumbnails
```
Response body Payload :

```
{
    thumbnails : [
      {
        _id : string,
        videoUrl : string,
        thumbnailUrl : string
      }
    ]
}
```

### Product List Displayed in A Video
It get All products that related in to a video.

```http
  GET /video=${videoId}/products
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `videoId`      | `string` | **Required**. Id of video to fetch |

Response body Payload :

```
{
    producs : [
      {
          _id: string,
          name: string,
          username: string,
          description: string,
          url: string,
          price: [{currency: string, amount: number, _id: string"}]
      }]
}
```

### Comment List

It get All comment that related in to a video.

```http
  GET /video=${videoId}/comment
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `videoId`      | `string` | **Required**. Id of video to fetch |

Response body Payload :

```
{
    comments : [
      {
        username: string,
        comment: string,
        date: date,
        _id: string
      }]
}
```

### Submit comment
Submit comment in video
```http
  POST /video/comment/insert
```
Request payload : 
```
  {
    videoId : string, required,
    username : string, required,
    comment : string,
    token : string
  }
```

### Register User

```http
  GET /user/register
```

Request body Payload :

```
{
    username : string,
    email : string,
    password : string
}
```

### Login User

```http
  POST /user/login
```

Request body Payload :

```
{
    username : string,
    password : string
}
```
Response body Payload :

```
{
    data: {
        token: string,
        username: string
    }
}
```

### Get All User
```http
  Get /user/getAll
```
Response body Payload :

```
{
    data: {
        users: object[]
    }
}
```


