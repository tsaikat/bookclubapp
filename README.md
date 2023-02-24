#BookclubApp
This is a Next.js project written in JavaScript(React). A web client application for [Bookclub](https://github.com/tsaikat/bookclub) REST API

## Getting Started
Please follow the steps below to get started.

1. Clone the project on your local drive
2. Edit .env.local file to set up the following veriables 
- `NEXT_PUBLIC_API_HOST`, currently it's `http://localhost:8000` (run the backend first -> [Bookclub](https://github.com/tsaikat/bookclub))
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `JWT_SCRET` for encryption. This can be generated using command `openssl rand -base64 32` on your terminal. 
- `NEXTAUTH_URL` (optional) can be alterered to start the web server in a different port.

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

5. [http://localhost:3000](http://localhost:3000) with your browser to see the result.