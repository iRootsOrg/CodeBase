FROM mathworks/matlab:r2024a

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the script   /function to be executed to the working directory
COPY login.m .
COPY myscript.m .

# Start MATLAB in batch mode and execute your script/function
CMD ["matlab", "-batch", "login; my_script"]


# docker build -t my-matlab-container .
# docker run -it --rm --shm-size=512M -v E:\iRoots\CodeBase\compiler\matlab:/usr/src/app -v E:\iRoots\CodeBase\compiler\matlab:/usr/src/app/output my-matlab-container
# docker run -it --rm --shm-size=512M -v E:\iRoots\CodeBase\compiler\matlab/usr/src/app -v E:\iRoots\CodeBase\compiler\matlab/usr/src/app/output -e MATLAB_ACCESS_TOKEN=41202181 my-matlab-container
