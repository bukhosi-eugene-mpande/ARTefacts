# ARTefact

## Overview

This project is a full-stack application utilizing React for the frontend, Java for the backend, and AWS services for deployment and authentication. The system is designed to provide a seamless and scalable experience, leveraging AWS Lambda, Cognito, S3, and Elastic Beanstalk.

## Technologies Used

### Frontend

- React (JavaScript/TypeScript)

### Backend

- Java (AWS Lambda)

### AWS Services

- **AWS Lambda** – Serverless compute service for executing backend logic
- **AWS Cognito** – Authentication and user management
- **AWS S3** – File storage for assets and data
- **AWS Elastic Beanstalk** – Scalable application deployment

## Installation

### Prerequisites

- Node.js & npm (for frontend development)
- Java
- AWS CLI (for managing AWS services)

### Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. **Frontend Setup:**

   ```sh
   cd frontend
   npm install
   npm start
   ```

3. **AWS Configuration:**
   - Ensure AWS CLI is configured with appropriate credentials.
   - Set up Cognito user pool for authentication.
   - Deploy backend services to AWS Lambda or Elastic Beanstalk.
   - Use S3 for file storage as needed.

## Deployment

### Frontend

- Deploy React app to an AWS S3 bucket or another hosting service.

### Backend

- Deploy Java backend using AWS Elastic Beanstalk or as a Lambda function.

## Usage

- Register/Login using AWS Cognito.
- Interact with the frontend connected to the backend API.
- Upload/download files from S3.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes and push: `git push origin feature-name`.
4. Create a Pull Request.

## License

This project is licensed under MIT.
