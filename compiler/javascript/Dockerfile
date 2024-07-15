# Use the official Node.js image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy runner script
COPY runner.sh .

# Ensure runner.sh is executable
RUN chmod +x ./runner.sh

# Command to run the script
CMD ["./runner.sh"]
