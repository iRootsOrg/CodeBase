import { CODE_SNIPPETS } from "../Utils/languages";

const languages = Object.entries(CODE_SNIPPETS);

const DropDown = ({ language, onSelect, lightmode }) => {
  return (
    <div className={`hidden  sm:flex gap-2 items-center `}>
      <label className={`block text-lg font-semibold ${lightmode ? "text-black" : "text-white"}`}>
        Language:
      </label>
      <select
        className="block px-2 py-1 rounded border border-gray-700 focus:outline-none"
        value={language}
        onChange={(e) => onSelect(e.target.value)}
      >
        {languages.map(([lang, snip]) => (
          <option
            key={lang}
            value={lang}
            className={
              lightmode
                ? `bg-${lang === language ? "white" : "gray-100"} ${
                    lang === language
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`
                : `bg-${lang === language ? "black" : "gray-100"} ${
                    lang === language
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`
            }
          >
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropDown;
