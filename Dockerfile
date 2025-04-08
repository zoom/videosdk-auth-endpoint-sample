# Stage 1: Build
FROM node:16 AS build

WORKDIR /code

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Set environment variable to ensure NODE_ENV is production
ENV NODE_ENV=production

# Build the project (if applicable)
# RUN npm run build

# Expose port (optional, based on application)
# EXPOSE 3000

# Use CMD instead of ENTRYPOINT for better flexibility
CMD [ "npm", "run", "start" ]
