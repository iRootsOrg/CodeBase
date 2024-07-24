# Use the official Node.js image
FROM node:14
# Install cron
RUN apt-get update && apt-get install -y cron

# Create app directory
WORKDIR /usr/src/app

# Copy runner script and check_and_run script
COPY runner.sh .
COPY check_and_run.sh .

# Ensure scripts are executable
RUN chmod +x ./runner.sh ./check_and_run.sh

# Add the cron job
RUN echo "* * * * * /usr/src/app/check_and_run.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/check_and_run
RUN chmod 0644 /etc/cron.d/check_and_run
RUN crontab /etc/cron.d/check_and_run

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the cron service and tail the log file
CMD cron && tail -f /var/log/cron.log



# Remember to change the End of Line sequence to LF of each file (Dockerfile, check_and_run.sh, runner.sh)
# docker build -t cron-monitor-container .
# docker run -d -v "$(pwd)/input:/usr/src/app/input" -v "$(pwd)/output:/usr/src/app/output" cron-monitor-container
