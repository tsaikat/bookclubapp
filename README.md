# BookclubApp
This is a Next.js project written in JavaScript(React). A web client application for [Bookclub](https://github.com/tsaikat/bookclub) REST API.

## Features
- User login using Google
- All CRUD operation interatively
- Adding Books to the Cart
- Checking out cart
- Signing out when the session expires


## Getting Started
Please follow the steps below to get started.

1. Clone the project on your local drive
2. Create a .env.local file and add the following veriables required to run the applicaiton 
- `NEXT_PUBLIC_API_HOST`: Set it to `http://localhost:8000` (run the backend first -> [Bookclub](https://github.com/tsaikat/bookclub)). Or the location of API if it's different.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `JWT_SCRET` : For encryption. This can be generated using command `openssl rand -base64 32` on your terminal. 
- `NEXTAUTH_URL`: What port the web server should start. For example: `http://localhost:3000`

## How to run?
Build/compile the project without docker:
```bash
npm run build
# or
yarn dev
```

4. Run the project:

```bash
npm run start
# or
yarn start
```
### Run on Docker Container
Run the command on the terminal: `docker-compose up`

5. visit [http://localhost:3000](http://localhost:3000) with your browser to see the result.