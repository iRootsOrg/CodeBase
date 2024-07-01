import { CODE_SNIPPETS } from "../Utils/languages";
  
  const languages = Object.entries(CODE_SNIPPETS);

  
  const DropDown = ({ language, onSelect }) => {
    return (
      <div className="ml-2 mb-4 flex gap-2 mt-4 items-center">
  <label className="block mb-2 text-lg font-semibold">Language:</label>
  <select
    className="block w-20% px-4 py-1 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none"
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
  