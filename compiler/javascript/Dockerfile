# Use the official Node.js image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy input files
COPY input/ ./input
COPY runner.sh .

# Install any needed packages (if required)
RUN npm install

# Make runner.sh executable
RUN chmod +x runner.sh

# Command to run the script
CMD ["./runner.sh"]


# docker build -t js-compiler .
# docker run --rm -v "$(pwd)/output:/usr/src/app/output" js-compiler
