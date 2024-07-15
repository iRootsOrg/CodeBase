# Use the official Ubuntu base image
FROM ubuntu:20.04

# Set working directory inside the container
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*


# Set up MATLAB Runtime
RUN mkdir /mcr-install && \
    wget -q -O /mcr-install/mcr.zip https://ssd.mathworks.com/supportfiles/downloads/R2024a/Release/4/deployment_files/installer/complete/glnxa64/MATLAB_Runtime_R2024a_Update_4_glnxa64.zip && \
    unzip -q /mcr-install/mcr.zip -d /mcr-install && \
    /mcr-install/install -mode silent -agreeToLicense yes -outputFile /tmp/mw_install_log.txt && \
    rm -rf /mcr-install && \
    rm /mcr-install/mcr.zip

# Copy MATLAB script and input file into the container
COPY myfunction.m /app/myfunction.m
COPY input.txt /app/input.txt

# Create a script to execute MATLAB script with input file
RUN echo '#!/bin/bash' > /app/run_matlab.sh && \
    echo "export LD_LIBRARY_PATH=/usr/local/MATLAB/from-host/bin/glnxa64:\$LD_LIBRARY_PATH" >> /app/run_matlab.sh && \
    echo "/usr/local/MATLAB/from-host/bin/matlab -nodisplay -nosplash -r \"try; myfunction('/app/input.txt', '/app/output.txt'); catch; exit(1); end; exit(0);\"" >> /app/run_matlab.sh && \
    chmod +x /app/run_matlab.sh

# Execute the MATLAB script when the container starts
CMD ["/app/run_matlab.sh"]