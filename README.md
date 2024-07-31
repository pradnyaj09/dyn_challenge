# DYN Media Coding Challenge

For this challenge, NestJS which is Node.js based framework was used to build the application. AWS Cognito SDK was used to facilitate authentication flow.

## Get Started
1. To start the applications: npm run start
2. To run unit test cases: npm run test

## Features

- **User Sign UP**: Allows users to register with their email ID, password and a favourite sport/sports.
- **User Sign-in**: Authenticates users with their email ID and password.
- **Integration with AWS Cognito**: Utilizes AWS Cognito for user management and authentication.

## Technologies Used
- **Nest JS**: Node.js based framework for building server side application.
- **AWS SDK**: TO integrate AWS Cognito service for authentication.
- **TypeScript**
- **Docker**: For containerizing the application.

### Prerequisites
- **Node.js**: Node.js must be installed. This project uses Node.js 18 version
- **AWS Account**: An AWS account with access to Cognito, create a user pool with pre-signup lambda function that auto-confirms the user on registration or sign-up
- **Environment Variables**: Create a .env file in the root of the project, further details ca be found in the following section
- Docker is optional

#### Environment Variables
Create a .env file at the root of the project and add the following variables:

- AWS_COGNITO_USER_POOL_ID={YOUR_USER_POOL_ID}
- AWS_COGNITO_CLIENT_ID={YOUR_CLIENT_ID}
- AWS_COGNITO_REGION={YOUR_REGION}

Replace these placeholders with actual values that can be found on the AWS Console.


### Installation
1. **Clone the repository**
2. Install dependencies with npm,`npm install`
3. Run the application with `npm run start`
4. To run the unit tests, `npm run test`

### Docker
1. **Clone the repository**
2. Ensure docker is installed and docker daemon is running.
3. Build docker image with this command: `docker build --no-cache -t {imageName}:latest .`
4. Run the docker container with: `docker run -p 3000:3000 --env-file .env -d {imageName}: latest`

After running the application using one of the approaches mentioned above, the application will be available on https://localhost:3000


### Offered API Endpoints:
1. **Sign-up**:
- Endpoint: `/auth/signup`
- Method: POST
- Request Body: 
  ```
  {
    "emailId": "user@example.com",
    "password": "your-password",
    "favSport": "soccer"
  }
- Response:
  ```
  {
    "statusCode": number,
    "message": string,
    "data": null
  }
- Available at: `https://localhost:3000/signup.html`

2. **Sign-in**:
- Endpoint: `/auth/signin`
- Method: POST
- Request Body: 
  ```
  {
    "emailId": "user@example.com",
    "password": "your-password"
  }
- Response:
  ```
  {
    "statusCode": number,
    "message": string,
    "data": {
      token: string;
      username: string;
    }
  }
- Available at: `https://localhost:3000/signin.html`

3. **Profile**:
- Endpoint: `/profile`
- Method: GET
- Request Headers: 
  ```
  {
    "idtoken": "string",
    "usrename": "username"
  }
- Response:
  ```
  {
    "message": string,
  }
- Available at: `https://localhost:3000/profile.html`






