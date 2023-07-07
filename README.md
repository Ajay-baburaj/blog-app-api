# Blog App API

This repository contains the API code for a simple blog application. The API allows users to perform various operations related to blog posts, such as creating, updating, and deleting posts.

## Installation

To run this API locally, follow these steps:

1. Clone the repository to your local machine using the following command:
   git clone https://github.com/Ajay-baburaj/blog-app-api.git

2. Navigate to the project directory:
   cd blog-app-api

3. Install the required dependencies using the package manager of your choice. For example, if you're using npm:
   npm install
   
4. Configure the environment variables by creating a `.env` file in the project's root directory. You can use the provided `.env.example` file as a template. Make sure to provide the necessary values for the environment variables.
   Dont forget to include these variables and values on .env file
    `PORT
     MONGO_URL 
     JWT_SECRET 
     REFRESH_SECRET 
     BUCKET_NAME 
     BUCKET_LOCATION
     S3_ACCESS_KEY 
     S3_SECRET_KEY`
   
6. Start the API server:
   npm start

   
The API will be running locally at `http://localhost:PORT`.

## API Endpoints

The following are the available endpoints provided by this API:

- `GET /all/posts`: Get all blog posts.
- `GET /post/:id`: Get a specific blog post by its ID.
- `POST /create/post`: Create a new blog post.
- `PUT /edit/post/:id`: Update an existing blog post by its ID.
- `DELETE /delete/post/:id`: Delete a blog post by its ID.

Please refer to the API documentation below for more details on how to use these endpoints.
https://www.postman.com/maintenance-saganist-21009386/workspace/blog-app-ajay-baburaj/collection/24863411-b8665332-c024-45ba-bea8-d8f3d9ad3403?action=share&creator=24863411

#Hosted link https://blog.indwear.store/api/v1

## Technologies Used

- Node.js: A JavaScript runtime environment.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing blog post data.
- Mongoose: An object modelling tool for MongoDB.
- aws s3 : For storing images of specific Blog
- Other dependencies: Please refer to the `package.json` file for a complete list of dependencies.


## Contact

If you have any questions or inquiries regarding this project, please contact the repository owner:

- Ajay Baburaj
- Email: ajaybaburajp@gmail.com
- GitHub: [Ajay-baburaj](https://github.com/Ajay-baburaj)

   
