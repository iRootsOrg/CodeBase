import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
    navigate("/");
  };

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <section className="bg-blueGray-50 min-h-screen flex flex-col lg:flex-row">
    
      <div className="lg:w-25% xl:w-1/2 bg-gray-800 rounded-r-lg flex justify-center">
        <img
          src={"./Icons/formimage.png"}
          alt="Login Image"
          className="object-cover h-full rounded-r-full"
        />
      </div>
      
      <div className="w-full lg:w-1/2 xl:w-1/3 px-4 flex flex-col justify-center mr-auto ml-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blueGray-500 text-sm font-bold">
                Sign in with
              </h6>
            </div>
            <div className="btn-wrapper text-center">
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img
                  alt="Github"
                  className="w-5 mr-1"
                  src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"
                />
                Github
              </button>
              <button
                className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img
                  alt="Google"
                  className="w-5 mr-1"
                  src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                />
                Google
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="flex flex-row items-center justify-center my-3">
              <hr className="flex-auto border-b-1 border-blueGray-300" />
              <span className="bg-white px-3 text-sm text-blueGray-500 uppercase">
                OR
              </span>
              <hr className="flex-auto border-b-1 border-blueGray-300" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full sm:w-auto ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <span className="text-sm text-blueGray-500">
                New to Compiler Module?{" "}
                <button
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={navigateToSignUp}
                >
                  Sign Up
                </button>
              </span>
            </div>
          </div>
        </div>
        <footer className="relative pt-2 pb-6 mt-0">
          <div className="container mx-auto px-2 text-center text-xs text-gray-600">
            By signing in, you accept our{" "}
            <a
              href="/terms"
              className="text-gray-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-gray-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Login;
