import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import toast from "react-hot-toast";
const Settings = (props) => {
  const [invite, setInvite] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [addCollab, setAddCollab] = useState(true);
  const [showInviteSuccessfull, setShowInviteSuccessfull] = useState(false);
  const [inviteSuccessfull, setInviteSuccessfull] = useState(false);
  const [selected, setSelected] = useState(0);
  const handleInvite = () => {
    setInvite(!invite);
    setSelected(2);
  };

  const handleFontSizeChange = (e) => {
    props.setFontSize(parseInt(e.target.value, 10));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    props.setEmail(email);
    setIsValidEmail(validateEmail(email));
  };

  const sendEmail = () => {
    //send post request to backend
    //Email

    setInvite(false);

    //Successfull
    setInviteSuccessfull(true);

    setShowInviteSuccessfull(true);
    toast.success("Invite Successful");
    setTimeout(() => {
      setShowInviteSuccessfull(false);
    }, 3000);

  }

  return (
    <div
      className={`w-72 border shadow-sm rounded font-semibold select-none ${
        props.lightmode
          ? " border-black shadow-black bg-gray-100"
          : "border-white shadow-white bg-[#1e1e1e] "
      }`}
    >
      <div className="text-lg px-2 font-bold">Settings</div>

      <button
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => { props.formatCode() }}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] z-10"
          src={
            props.lightmode
              ? "./Icons/CodeFormatter.png"
              : "./Icons/CodeFormatterLight.png"
          }
          alt="Code Formatter"
        ></img>
        <div>Code Format</div>
      </button>
      <div className="flex">
        <button
          className={`flex gap-2 items-center ${
            props.lightmode
              ? `hover:text-blue-600 ${invite ? "text-blue-600" : ""}`
              : `hover:text-[#00BFFF] ${invite ? "text-cyan-400" : ""}`
          } w-full  px-2.5 py-2
           ${invite ? "text-blue-600" : ""}`}
          onClick={() => {
            handleInvite();
          }}
        >
          <img
            className=" mix-blend-multiply !h-[24px] !w-[24px] "
            src={
              props.lightmode ? "./Icons/Invite.png" : "./Icons/InviteLight.png"
            }
            alt="Invite"
          ></img>
          <div className="flex justify-between w-full pr-4 items-center">
            <div>Invite Others </div>
            {showInviteSuccessfull ? (
              inviteSuccessfull ? (
                <div>
                  <BiCheckCircle className="text-green-500 h-6 w-6 mr-4" />
                </div>
              ) : (
                <div>
                  <BiXCircle className="text-red-500 h-6 w-6 mr-4" />
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </button>

        {invite ? (
          <div
            className={`left-72 absolute ml-2 border rounded ${
              props.lightmode
                ? "border-black bg-gray-100 text-black"
                : "border-gray-100 bg-[#1e1e1e] text-white"
            } p-2.5`}
          >
            <div className=" w-64 p-2 gap-3 flex flex-col">
              {addCollab === true ? (
                <div className="flex justify-between">
                  <div className="font-semibold underline">
                    Add a collaborator individual
                  </div>
                  <button
                    onClick={() => {
                      setAddCollab(!addCollab);
                    }}
                  >
                    <IoPersonAdd />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div className="font-semibold underline">
                    Add a collaborator institute
                  </div>
                  <button
                    onClick={() => {
                      setAddCollab(!addCollab);
                    }}
                  >
                    <IoPersonAdd />
                  </button>
                </div>
              )}

              <div className="w-full flex gap-4">
                <input
                  placeholder="Add user's email"
                  className={`focus:outline-none ${
                    props.lightmode ? "bg-gray-100" : "bg-[#1e1e1e]"
                  } w-full `}
                  onChange={(e) => handleEmailChange(e)}
                ></input>

                <button onClick={() => sendEmail()}>
                  <FaPlus />
                </button>
              </div>

              {isValidEmail === true ? (
                <div className="text-green-600">✅ Valid Email</div>
              ) : (
                <div className="text-rose-600">
                  ❌ Please enter a valid email
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <button
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.setKeyboardShortcut(true);
          props.setSettingsOpen(!props.settingsopen);
          props.setSelected(0);
        }}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode
              ? "./Icons/KeyBoardShortcut.png"
              : "./Icons/KeyBoardShortcutLight.png"
          }
          alt="Code Formatter"
        ></img>
        <div>Keyboard Shortcuts</div>
      </button>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
      >
        <img
          className=" mix-blend-multiply !h-[24px] !w-[24px] "
          src={
            props.lightmode
              ? "./Icons/FontSize.png"
              : "./Icons/FontSizeLight.png"
          }
          alt="FontSize"
        ></img>
        <div className="mr-4">Font Size</div>
        <select
          value={props.fontSize}
          onChange={handleFontSizeChange}
          className={`px-2 py-1 rounded border focus:outline-none ${
            props.lightmode
              ? "text-black bg-white border-black"
              : "text-white bg-[#1e1e1e] border-white"
          }`}
        >
          {[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
      <button
        className={`flex justify-between pr-6 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.setWordWrap(!props.wordWrap);
          props.setSettingsOpen(!props.settingsopen);
          props.setSelected(0);
        }}
      >
        <div className="flex gap-2 items-center">
          <img
            className=" mix-blend-multiply !h-[24px] !w-[24px] "
            src={
              props.lightmode
                ? "./Icons/WordWrap.png"
                : "./Icons/WordWrapLight.png"
            }
            alt="Word Wrap"
          ></img>
          <div>Word Wrap</div>
        </div>
        {props.wordWrap === true ? (
          <div>
            <BiCheckCircle className="text-green-500 h-6 w-6 mr-4" />
          </div>
        ) : (
          <div>
            <BiXCircle className="text-red-500 h-6 w-6 mr-4" />
          </div>
        )}
      </button>
      <div
        className={`flex gap-2 items-center hover:${
          props.lightmode ? "text-blue-600" : "text-[#00BFFF]"
        } w-full  px-2.5 py-2`}
        onClick={() => {
          props.handleLight();
        }}
      >
        {props.lightmode === true ? (
          <div className="mr-4 flex items-center gap-2">
            <AiOutlineSun className="h-6 w-6" />
            <div>Dark Mode</div>
          </div>
        ) : (
          <div className="mr-4  flex items-center gap-2 ">
            <AiOutlineMoon className="h-6 w-6" />
            <div>Light Mode</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
