# Use the official Node.js image
FROM node:14

# Install necessary tools
RUN apt-get update && apt-get install -y

# Create app directory
WORKDIR /usr/src/app

# Copy runner script and check_and_run script
COPY runner.sh .
COPY check_and_run.sh .

# Ensure scripts are executable
RUN chmod +x ./runner.sh ./check_and_run.sh

# Run the check_and_run script as a service
CMD ./check_and_run.sh


# Remember to change the End of Line sequence to LF of each file (Dockerfile, check_and_run.sh, runner.sh)
# docker build -t cron-monitor-container .
# docker run -d -v "$(pwd)/input:/usr/src/app/input" -v "$(pwd)/output:/usr/src/app/output" cron-monitor-container
