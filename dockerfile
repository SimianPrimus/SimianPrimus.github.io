# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 3000 (optional, depending on how you serve your files)
EXPOSE 3000

# Command to run Tailwind CSS in watch mode
CMD ["npm", "run", "build:css"]
