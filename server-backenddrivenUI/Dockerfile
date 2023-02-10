# Use an official Node.js image as the base image
FROM node:16.13.2

# Set the working directory in the image file system
WORKDIR /app

# Copy the package.json and package-lock.json files to the image
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application source code to the image
COPY . .

# Expose port 4000 for the GraphQL API
EXPOSE 4000

# Define the command to run the application
CMD [ "npm", "start" ]
