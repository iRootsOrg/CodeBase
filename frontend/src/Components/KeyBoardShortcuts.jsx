
import {  FaTimes } from "react-icons/fa";

const KeyBoardShortcuts = (props) => {
    

    return (
      <div className="fixed bottom-0 w-full h-full sm:w-auto sm:h-auto sm:inset-0 flex items-end sm:items-center sm:justify-center ">
        <div
          className={`border ${
            props.lightmode
              ? "bg-gray-100 bg-opacity-90 text-black border-black"
              : "bg-[#1e1e1e] bg-opacity-90 text-white border-white"
          } p-6 rounded-lg shadow-lg relative w-full sm:w-[70vw]  sm:h-auto`}
        >
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                props.setKeyboardShortcut(false);
              }}
              className={`absolute top-3 right-2 ${
                props.lightmode
                  ? "text-black hover:text-gray-700"
                  : "text-white hover:text-gray-200"
              }`}
            >
              <FaTimes size={24} />
            </button>
            <h2 className={`text-xl font-bold top-3  `}>Key Board Shortcuts</h2>
          </div>

          <div
            className={`overflow-x-auto overflow-y-auto sm:h-[80vh] h-[40vh] mt-2  ${
              props.lightmode ? "scrollbar-light" : "scrollbar-dark"
            }`}
          >
            <table
              className={`min-w-full ${
                props.lightmode
                  ? "bg-white border border-gray-300 "
                  : "bg-[#1e1e1e] border-black "
              }`}
            >
              <thead>
                <tr>
                  <th className="border px-4 py-2">Command</th>
                  <th className="border px-4 py-2">Keybinding</th>
                  <th className="border px-4 py-2">When to Use</th>
                  <th className="border px-4 py-2">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Command Palette</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + Shift + P</p>
                    <p>Cmd + Shift + P</p>
                  </td>
                  <td className="border px-4 py-2">
                    To access all available commands and features in VS Code.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Quick Open</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + P</p>
                    <p>Cmd + P</p>
                  </td>
                  <td className="border px-4 py-2">
                    To quickly open files by typing their name.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Find</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + F</p>
                    <p>Cmd + F</p>
                  </td>
                  <td className="border px-4 py-2">
                    To find a string within the current file.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Toggle Terminal</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + `</p>
                  </td>
                  <td className="border px-4 py-2">
                    To show or hide the integrated terminal.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Save</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + S</p>
                    <p>Cmd + S</p>
                  </td>
                  <td className="border px-4 py-2">
                    To save the current file.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Open Settings</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + ,</p>
                    <p>Cmd + ,</p>
                  </td>
                  <td className="border px-4 py-2">
                    To open the user settings configuration.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Format Document</td>
                  <td className="border px-4 py-2">
                    <p>Shift + Alt + F</p>
                    <p>Shift + Option + F</p>
                  </td>
                  <td className="border px-4 py-2">
                    To automatically format the entire document according to the
                    language's formatting rules.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Comment Line</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + /</p>
                    <p>Cmd + /</p>
                  </td>
                  <td className="border px-4 py-2">
                    To toggle commenting on the current line or selected lines.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Replace</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + H</p>
                    <p>Cmd + Option + F</p>
                  </td>
                  <td className="border px-4 py-2">
                    To find and replace a string within the current file.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Go to Line</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + G</p>
                    <p>Cmd + G</p>
                  </td>
                  <td className="border px-4 py-2">
                    To navigate to a specific line number in the file.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Duplicate Line</td>
                  <td className="border px-4 py-2">
                    <p>Shift + Alt + Down</p>
                    <p>Shift + Option + Down</p>
                  </td>
                  <td className="border px-4 py-2">
                    To duplicate the current line or selection below.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Move Line Up/Down</td>
                  <td className="border px-4 py-2">
                    <p>Alt + Up/Down</p>
                    <p>Option + Up/Down</p>
                  </td>
                  <td className="border px-4 py-2">
                    To move the current line or selection up or down.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Split Editor</td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + \</p>
                    <p>Cmd + \</p>
                  </td>
                  <td className="border px-4 py-2">
                    To split the current editor into two.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Toggle Sidebar Visibility
                  </td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + B</p>
                    <p>Cmd + B</p>
                  </td>
                  <td className="border px-4 py-2">
                    To show or hide the sidebar.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Multi-cursor (add cursor above/below)
                  </td>
                  <td className="border px-4 py-2">
                    <p>Ctrl + Alt + Up/Down</p>
                    <p>Option + Cmd + Up/Down</p>
                  </td>
                  <td className="border px-4 py-2">
                    To add multiple cursors for simultaneous editing.
                  </td>
                  <td className="border px-4 py-2">General Windows/Mac</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default KeyBoardShortcuts;