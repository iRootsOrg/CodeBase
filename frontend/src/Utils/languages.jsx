export const CODE_SNIPPETS = {
  Choose_Language: `No File/Language Selected`,
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp: 'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
  r: `greet <- function(name) {\n\tcat("Hello, ", name, "!\n")\n}\n\ngreet("Alex")\n`,
  matlab: `function greet(name)\n\tfprintf('Hello, %s!\n', name);\nend\n\ngreet('Alex');\n`,
  cpp: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}\n`,
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
};


export const LAN_CONVERSION = {
  Choose_Language: `txt`,
  javascript: `js`,
  typescript: `ts`,
  python: `py`,
  java: `java`,
  csharp:
    'cs',
  php: "php",
  r: `R`,
  matlab: `m`,
  cpp: `cpp`,
  c: `c`,
};
