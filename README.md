## Run Locally

Clone the project

```bash
  git clone https://github.com/ovisannn/drivethrul-lib
```

Go to the project directory

```bash
  cd drivethrul-lib
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