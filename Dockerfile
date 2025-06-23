# Use Node.js LTS version
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code into container
COPY . .

# Expose app port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
