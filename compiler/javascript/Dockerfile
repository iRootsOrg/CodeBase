# Use the official Node.js image
FROM node:14

# Install necessary tools
RUN apt-get update && apt-get install -y

# Create app directory
WORKDIR /usr/src/app

# Copy runner script, check_and_run script, and input directory
COPY runner.sh .
COPY check_and_run.sh .
COPY input ./input
COPY api-server/server.js ./api-server/server.js
COPY runner.js .

# Copy the api-server files
COPY api-server/package*.json ./api-server/
WORKDIR /usr/src/app/api-server
RUN npm install

# Ensure scripts are executable
WORKDIR /usr/src/app
RUN chmod +x ./runner.sh ./check_and_run.sh

# Run the check_and_run script and API server as background services
CMD ["sh", "-c", "./check_and_run.sh & node /usr/src/app/api-server/server.js"]


# docker build -t code-runner .
# docker run -d -p 5000:5000 code-runner