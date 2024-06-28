
export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
    cpp: "11.1",
    c: "11.1",
    ruby: "3.1",
    go: "1.18",
    swift: "5.5",
    kotlin: "1.6",
  };
  
  export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
      'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    cpp: `\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}\n`,
    c: `\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
    ruby: `\ndef greet(name)\n\tputs "Hello, #{name}!"\nend\n\ngreet("Alex")\n`,
    go: `\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}\n`,
    swift: `\nfunc greet(name: String) {\n\tprint("Hello, \\(name)!")\n}\n\ngreet(name: "Alex")\n`,
    kotlin: `\nfun greet(name: String) {\n\tprintln("Hello, $name!")\n}\n\nfun main() {\n\tgreet("Alex")\n}\n`,
  };
  