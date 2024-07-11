import { CODE_SNIPPETS } from "../Utils/languages";
  
  const languages = Object.entries(CODE_SNIPPETS);

  
  const DropDown = ({ language, onSelect }) => {
    return (
      <div className="  flex gap-2 items-center ">
  <label className="block text-lg font-semibold">Language:</label>
  <select
    className="block px-4 py-1 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none"
    value={language}
    onChange={(e) => onSelect(e.target.value)}
  >
    {languages.map(([lang, snip]) => (
      <option
        key={lang}
        value={lang}
        className={`bg-${lang === language ? 'gray-900' : 'transparent'} hover:bg-gray-900 ${
          lang === language ? 'text-blue-500' : ''
        }`}
      >
        {lang}
      </option>
    ))}
  </select>
</div>

    );
  };
  export default DropDown;
  