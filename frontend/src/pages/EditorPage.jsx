import Output from "../Components/Output.jsx";
import CodeEditor from "../Components/CodeEditor";
import TestCase from "../Components/TestCase.jsx";
import { useState, useEffect, useRef } from "react";
import JSZip, { folder } from "jszip";
import { saveAs } from "file-saver";
import Run from "../Components/Run.jsx";
import RunAll from "../Components/RunAll.jsx";
import { FaFacebook, FaTwitter, FaWhatsapp, FaTimes } from "react-icons/fa";
import { CODE_SNIPPETS, LAN_CONVERSION } from "../Utils/languages.jsx";
import KeyBoardShortcuts from "../Components/KeyBoardShortcuts.jsx";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { restrictedPatterns } from "../Utils/restrictedtext.jsx";


import { server,compiler } from "../service/api.js";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const FormData = require("form-data");


const EditorPage = () => {
  

  const [opennewfolder, setOpenNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [boilerplatecode, setBoilerPlateCode] = useState(true);

  const [shareOpen, setShareOpen] = useState(false);

  const [newFileName, setNewFileName] = useState("");
  const [opennewfile, setOpenNewFile] = useState(false);

  const [openExtraNewFile, setOpenExtraNewFile] = useState(false);
  const [extraNewFileName, setExtraNewFileName] = useState("");

  //Sample Folders
  const [saveLocally, setSaveLocally] = useState(false);
  const [folderopen, setFolderOpen] = useState(false);

  const initialTestCases = [
    {
      input: { content: "1" },
      output: {
        error: false,
        errorCount: 0,
        warning: 0,
        errors: 0,
        content: "No Output",
      },
    },
    {
      input: { content: "2" },
      output: {
        error: false,
        errorCount: 0,
        warning: 0,
        errors: 0,
        content: "No Output",
      },
    },
    {
      input: { content: "3" },
      output: {
        error: false,
        errorCount: 0,
        warning: 0,
        errors: 0,
        content: "No Output",
      },
    },
    {
      input: { content: "4" },
      output: {
        error: false,
        errorCount: 0,
        warning: 0,
        errors: 0,
        content: "No Output",
      },
    },
    {
      input: { content: "5" },
      output: {
        error: false,
        errorCount: 0,
        warning: 0,
        errors: 0,
        content: "No Output",
      },
    },
  ];

  const initialOutput = {
    CompilationStatus: "Not Started",
    ExecutionTime: "0.00",
    FilesCompiled: "Still Not Compiled",
    tc: initialTestCases,
  };

  const initialFolderFiles = {
    folders: [],
    extraFiles: [
      {
        name: "Sample File",
        code: CODE_SNIPPETS["javascript"],
        language: "javascript",
        output: initialOutput,
      },
    ],
  };

  const deltaChangesRef = useRef([]);
  const [deltaChanges, setDeltaChanges] = useState([]);

  const updateDeltaChanges = (newChanges) => {
    setDeltaChanges((prevChanges) => {
      const updatedChanges = [...prevChanges, ...newChanges];
      console.log("Delta changes updated:", updatedChanges);
      deltaChangesRef.current = updatedChanges;
      return updatedChanges;
    });
  };
  const getChangesFromEditor = () => {
    console.log("Fetching current delta changes:", deltaChangesRef.current);
    return deltaChangesRef.current;
  };

  const pollForChanges = () => {
    return setInterval(async () => {
      const changes = deltaChangesRef.current;
      console.log("Polling - Current changes:", changes);

      if (changes.length > 0) {
        try {
          const response = await fetch(`${server}/api/files/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ...",
            },
            body: JSON.stringify({
              projectId: "66a4711832fbcc6ead5b8860",
              changes: changes,
            }),
          });
          const data = await response.json();
          console.log("Files updated:", data);

          // Clear the changes after successful update
          setDeltaChanges([]);
          deltaChangesRef.current = [];
        } catch (error) {
          console.error("Error updating files:", error);
        }
      } else {
        console.log("No changes to send");
      }
    }, 5000);
  };

  useEffect(() => {
    deltaChangesRef.current = deltaChanges;
  }, [deltaChanges]);

  const [folderfiles, setFolderFiles] = useState(initialFolderFiles);
  const [language, setLanguage] = useState("javascript");
  const [testCases, setTestCases] = useState(initialTestCases);

  const [value, setValue] = useState("");
  const [option, setOption] = useState("Output");

  const [outputFile, setOutputFile] = useState(initialOutput);

  useEffect(() => {
    const initialCode = localStorage.getItem("folderfiles");
    // console.log(initialCode);

    if (initialCode === null) {
      localStorage.setItem("folderfiles", JSON.stringify(initialFolderFiles));
      setLanguage(initialFolderFiles.extraFiles[0].language);
      setValue(initialFolderFiles.extraFiles[0].code);
      setOutputFile(initialFolderFiles.extraFiles[0].output);
      setTestCases(initialFolderFiles.extraFiles[0].output.tc);
    } else {
      const folderParsing = JSON.parse(initialCode);
      setFolderFiles(folderParsing);
      setLanguage(folderParsing.extraFiles[0].language);
      setValue(folderParsing.extraFiles[0].code);
      setOutputFile(folderParsing.extraFiles[0].output);
      setTestCases(folderParsing.extraFiles[0].output.tc);
      setSaveLocally(true);
    }
    setExtraFileIndex(0);
  }, []);

  // useEffect(() => {
  //   const intervalId = pollForChanges();
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    if (saveLocally === true) {
      localStorage.setItem("folderfiles", JSON.stringify(folderfiles));
    }
  }, [folderfiles]);

  const [lightmode, setLightMode] = useState(true);

  const handleLight = () => {
    if (lightmode === false) {
      toast("Hello Light!", {
        icon: <AiOutlineSun className="h-6 w-6" />,
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
        duration: 800,
      });
    } else {
      toast("Hello Darkness!", {
        icon: <AiOutlineMoon className="h-6 w-6" />,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 800,
      });
    }

    setLightMode(!lightmode);
  };

  const [folderIndex, setFolderIndex] = useState(-1);
  const [fileIndex, setFileIndex] = useState(-1);
  const [extraFileIndex, setExtraFileIndex] = useState(-1);
  const [selectedFiles, setSelectedFiles] = useState(null); //The uploaded files

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("URL copied to clipboard!", { duration: 800 });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log(files);

    toast.success("Files Uploaded Successfully", { duration: 800 });
  };



  const handleFolderName = (e) => {
    const name = e.target.value;
    let isValid = true;

    restrictedPatterns.forEach((pattern) => {
      if (pattern.test(name)) {
        isValid = false;
        return; // Exit the forEach loop early
      }
    });

    if (isValid) {
      console.log(name);
      setNewFolderName(name);
    } else {
      console.log("Restricted characters detected");
      toast.error("Your input contains restricted characters", {
        id: "restricted-chars-error-folder",
        duration: 800,
      });
    }
  };

  const addNewFolder = () => {
    setFolderFiles((prevState) => ({
      ...prevState,
      folders: [
        ...prevState.folders,
        {
          name: newFolderName,
          files: [],
        },
      ],
    }));

    setOpenNewFolder(false);
    setNewFolderName("");
  };

  const updateChangeCode = () => {
    const updateFileCode = (
      folderIndex,
      fileIndex,
      extraFileIndex,
      newCode,
      newLanguage,
      newTestCases
    ) => {
      setFolderFiles((prevFolderFiles) => {
        if (folderIndex === -1) {
          // Update extraFiles
          const newExtraFiles = prevFolderFiles.extraFiles.map(
            (file, fiIndex) => {
              if (fiIndex === extraFileIndex) {
                console.log("Updating extra file:", file.name);
                return {
                  ...file,
                  code: newCode,
                  language: newLanguage,
                  output: {
                    ...file.output,
                    tc: newTestCases,
                  },
                };
              }
              return file;
            }
          );
          console.log("Updated extraFiles:", newExtraFiles);
          return {
            ...prevFolderFiles,
            extraFiles: newExtraFiles,
          };
        } else {
          // Update files within a folder
          const newFolders = prevFolderFiles.folders.map((folder, fIndex) => {
            if (fIndex === folderIndex) {
              return {
                ...folder,
                files: folder.files.map((file, fiIndex) => {
                  if (fiIndex === fileIndex) {
                    console.log(
                      "Updating file in folder:",
                      folder.name,
                      file.name
                    );
                    return {
                      ...file,
                      code: newCode,
                      language: newLanguage,
                      output: {
                        ...file.output,
                        tc: newTestCases,
                      },
                    };
                  }
                  return file;
                }),
              };
            }
            return folder;
          });

          console.log("Updated folders:", newFolders);
          return {
            ...prevFolderFiles,
            folders: newFolders,
          };
        }
      });
    };

    updateFileCode(
      folderIndex,
      fileIndex,
      extraFileIndex,
      value,
      language,
      testCases
    );

    // Post request sending can be implemented here
  };

 const updateChangeOutput = async (responseOutputData, testCaseSelected) => {
   const { testcaseOutputs } = responseOutputData;

   setFolderFiles((prevFolderFiles) => {
     const updateTestCases = (testCases, newOutputContents) => {
       if (testCaseSelected !== null) {
         return testCases.map((testCase, index) => {
           if (index === testCaseSelected) {
             return {
               ...testCase,
               output: {
                 ...testCase.output,
                 content: newOutputContents[0].outputContent, // Update the content here
               },
             };
           }
           return testCase;
         });
       } else {
         return testCases.map((testCase, index) => ({
           ...testCase,
           output: {
             ...testCase.output,
             content: newOutputContents[index].outputContent, // Update each test case with the corresponding output
           },
         }));
       }
     };

     if (folderIndex === -1) {
       // Update extraFiles
       const newExtraFiles = prevFolderFiles.extraFiles.map((file, fiIndex) => {
         if (fiIndex === extraFileIndex) {
           console.log("Updating extra file output :", file.name);
           return {
             ...file,

             output: {
               ...file.output,
               CompilationStatus: "Compilation Completed",
                 FilesCompiled:file.name,
               tc: updateTestCases(file.output.tc, testcaseOutputs),
             },
           };
         }
         return file;
       });
       console.log("Updated extraFiles:", newExtraFiles);
       return {
         ...prevFolderFiles,
         extraFiles: newExtraFiles,
       };
     } else {
       // Update files within a folder
       const newFolders = prevFolderFiles.folders.map((folder, fIndex) => {
         if (fIndex === folderIndex) {
           return {
             ...folder,
             files: folder.files.map((file, fiIndex) => {
               if (fiIndex === fileIndex) {
                 console.log(
                   "Updating file output in folder:",
                   folder.name,
                   file.name
                 );
                 return {
                   ...file,
                   output: {
                     ...file.output,
                     CompilationStatus: "Compilation Completed",
                     FilesCompiled: file.name,
                     tc: updateTestCases(file.output.tc, testcaseOutputs),
                   },
                 };
               }
               return file;
             }),
           };
         }
         return folder;
       });

       console.log("Updated folders:", newFolders);
       return {
         ...prevFolderFiles,
         folders: newFolders,
       };
     }
   });




   //Upadate Output Component
   if (fileIndex !== -1) {
     setOutputFile(folderfiles.folder[folderIndex].files[fileIndex].output);
   }
   else if (extraFileIndex !== -1) {
     setOutputFile(folderfiles.extraFiles[extraFileIndex].output);
   }
 };



  const [fileChecked, setFileChecked] = useState(false);
  const [outputChecked, setOutputChecked] = useState(false);
const formatOutput = (output) => {
  let formattedString =
    "Compilation Status: " + output.CompilationStatus + "\n";
  formattedString += "Execution Time: " + output.ExecutionTime + "\n";
  formattedString += "Files Compiled: " + output.FilesCompiled + "\n\n";

  output.tc.forEach((testCase, index) => {
    formattedString += `Test Case ${index + 1}:\n`;
    formattedString += `  Input:\n`;
    formattedString += `    Content: ${testCase.input.content}\n`;

    formattedString += `  Output:\n`;
    formattedString += `    Error: ${testCase.output.error}\n`;
    formattedString += `    Error Count: ${testCase.output.errorCount}\n`;
    formattedString += `    Warning: ${testCase.output.warning}\n`;
    formattedString += `    Errors: ${testCase.output.errors}\n`;
    formattedString += `    Content: ${testCase.output.content}\n`;

    formattedString += "\n";
  });

  return formattedString;
};
  const zipAndDownload = () => {
    const zip = new JSZip();
    if (folderIndex === -1 && fileIndex === -1 && extraFileIndex === -1) {
      folderfiles.folders.forEach((folder) => {
        const folderZip = zip.folder(folder.name);
        folder.files.forEach((file) => {
          if (fileChecked === true) {
            folderZip.file(
              `${file.name}.${LAN_CONVERSION[file.language]}`,
              file.code
            );
          }

          if (outputChecked === true) {
            const formattedOutput = formatOutput(file.output);
            folderZip.file(`${file.name} Output.txt`, formattedOutput);
          }
        });
      });
      folderfiles.extraFiles.forEach((file) => {
        if (fileChecked === true) {
          zip.file(`${file.name}.${LAN_CONVERSION[file.language]}`, file.code);
        }

        if (outputChecked === true) {
          const formattedOutput = formatOutput(file.output);
          zip.file(`${file.name} Output.txt`, formattedOutput);
        }
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "files.zip");
      });

      toast.success("All folders and files are downloaded!", { duration: 800 });
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.folders.length &&
      fileIndex === -1
    ) {
      const folder = folderfiles.folders[folderIndex];
      const folderZip = zip.folder(folder.name);

      folder.files.forEach((file) => {
        if (fileChecked === true) {
          folderZip.file(
            `${file.name}.${LAN_CONVERSION[file.language]}`,
            file.code
          );
        }

        if (outputChecked === true) {
          const formattedOutput = formatOutput(file.output);
          folderZip.file(`${file.name} Output.txt`, formattedOutput);
        }
      });

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${folder.name}.zip`);
      });

      toast.success(`${folder.name} is downloaded!`, { duration: 800 });
    } else if (
      extraFileIndex >= 0 &&
      extraFileIndex < folderfiles.extraFiles.length
    ) {
      const file = folderfiles.extraFiles[extraFileIndex];
      if (fileChecked === true) {
        const blob = new Blob([file.code], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name}.${LAN_CONVERSION[file.language]}`);
      }

      if (outputChecked === true) {
        const formattedOutput = formatOutput(file.output);
        const blob = new Blob([formattedOutput], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name} Output.txt`);
      }

      toast.success(`${file.name} is downloaded!`, { duration: 800 });
    } else if (
      folderIndex >= 0 &&
      folderIndex < folderfiles.folders.length &&
      fileIndex >= 0 &&
      fileIndex < folderfiles.folders[folderIndex].files.length
    ) {
      const folder = folderfiles.folders[folderIndex];
      const file = folder.files[fileIndex];
      if (fileChecked === true) {
        const blob = new Blob([file.code], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name}.${LAN_CONVERSION[file.language]}`);
      }

      if (outputChecked === true) {
        const formattedOutput = formatOutput(file.output);
        const blob = new Blob([formattedOutput], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(blob, `${file.name} Output.txt`);
      }

      toast.success(`${file.name} is downloaded!`, { duration: 800 });
    } else {
      toast.error("No folder/file selected", { duration: 800 });
    }

    setFileChecked(false);
    setOutputChecked(false);
  };

  const [infoOpen, setInfoOpen] = useState(false);
  const [reportBugOpen, setReportBugOpen] = useState(false);
  const [keyboardShortcut, setKeyboardShortcut] = useState(false);
  const [email, setEmail] = useState("");
  const [toolBar, setToolBar] = useState(true);
  const [testCaseSelected, setTestCaseSelected] = useState(0);

  //Making a file for sending
  //on clicking run

  // Example POST request
  //   fetch("/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       toast.success("Files successfully uploaded!", { duration: 800 });
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       toast.error("Failed to upload files.", { duration: 800 });
  //     });

  async function sendTestCases(testCases, trigger) {
    const form = new FormData();

    console.log("Sending testcases");

    // Check if the selected file is in the main folder
    if (folderIndex !== -1 && fileIndex !== -1) {
      const filename = `main.${LAN_CONVERSION[language]}`;
      const filecontent = folderfiles.folder[folderIndex].files[fileIndex].code;

      // Convert the file content to a Blob
      const fileBlob = new Blob([filecontent], { type: "text/plain" });

      form.append("main", fileBlob, filename);

      console.log(form);
    }
    // Check if the selected file is in the extra folder
    else if (extraFileIndex !== -1) {
      const extrafilename = `main.${LAN_CONVERSION[language]}`;
      const extrafilecontent = folderfiles.extraFiles[extraFileIndex].code;

      // Convert the extra file content to a Blob
      const extrafileBlob = new Blob([extrafilecontent], {
        type: "text/plain",
      });

      form.append("main", extrafileBlob, extrafilename);

      console.log(form);
    }

    // Run
    if (trigger === "run") {
      const testCaseName = `input_${testCaseSelected + 1}`;
      const testCaseContent = testCases[testCaseSelected].input.content;

      // Convert the test case content to a Blob
      const testCaseBlob = new Blob([testCaseContent], { type: "text/plain" });

      form.append(
        `input_file${testCaseSelected + 1}`,
        testCaseBlob,
        testCaseName
      );
    } else if (trigger === "runall") {
      testCases.forEach((testCase, index) => {
        let testCaseName = `input_${index + 1}`;
        let testCaseContent = testCase.input.content;

        // Convert the test case content to a Blob
        let testCaseBlob = new Blob([testCaseContent], {
          type: "text/plain",
        });

        form.append(`input_file${index + 1}`, testCaseBlob, testCaseName);

        console.log(`${testCaseName} added`);
      });
    }

    form.append("mainFile", `main.${LAN_CONVERSION[language]}`);
    for (let pair of form.entries()) {
      console.log(pair[0] + ":" + pair[1] + "\n");
    }

   
    try {
      const toastPromise = toast.promise(
        axios.post(`${server}/api/v1/file/upload`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhmYzkyZWVkNDFkZDRjYmM2YWZhNzQiLCJpYXQiOjE3MjIzNDY2MjMsImV4cCI6MTcyMjQzMzAyM30.FNmoH2gfMsbIICwRfT15Yl878qdI0fGWHp_riFpuMho",
          },
        }),
        {
          loading: "Sending files...",
          success: "Files sent successfully!",
          error: "Failed to send files. Please try again.",
        }
      );

      const response = await toastPromise;
      console.log("Files sent successfully:", response.data);
       
    
    const form = new FormData();
    form.append("response", response);
    form.append("folderIndex", folderIndex);
    form.append("fileIndex", fileIndex);
    form.append("testCaseSelected",testCaseSelected);
    console.log(form);

    console.log("Compiling");

    const compilerPromise = toast.promise(
      await axios.post(`${compiler}/initiate-compilation`, form),
      {
        loading: "Compiling...",
        success: (response) => {
          console.log("Compiled successfully:", response.data);
          return "Compiled successfully!";
        },
        error: (error) => {
          console.error("Error fetching output:", error);
          throw error;
        },
      }
    );

    const compilerResponse = await compilerPromise;
      console.log(compilerResponse);
      
      return response.data;
    } catch (error) {
      console.error("Error sending files:", error);
      throw error; // Re-throw the error so it can be handled by the caller if needed
    }
  }

  // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
  // sendTestCases(initialTestCases);

  //delete testCases
  const deleteTestCase = () => {
    setTestCases((prevTestCases) => {
      const updatedTestCases = prevTestCases.filter(
        (_, i) => i !== testCaseSelected
      );

      // Update the selected test case index
      if (testCaseSelected >= updatedTestCases.length) {
        // If the last test case was deleted, move selection to the previous one
        setTestCaseSelected(updatedTestCases.length - 1);
      } else if (updatedTestCases.length === 0) {
        // If no test cases are left, set the selection to null or another appropriate value
        setTestCaseSelected(null);
      }

      return updatedTestCases;
    });
  };

  const [testCaseBarHeight, setTestCaseBarHeight] = useState(60); // Initial height in pixels
  const initialHeight = 60; // Store the initial height as a constant

  const handleTestCaseBarResize = (e) => {
    const startY = e.clientY;
    const startHeight = testCaseBarHeight;

    const doDrag = (e) => {
      const newHeight = startHeight + (startY - e.clientY);
      const maxHeight = window.innerHeight * 0.5; // 50% of screen height
      const minHeight = initialHeight; // Use the initial height as the minimum
      setTestCaseBarHeight(Math.min(Math.max(newHeight, minHeight), maxHeight));
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const testCaseStyles =
    window.innerWidth >= 576
      ? { height: `${testCaseBarHeight}px`, maxHeight: "50vh" }
      : {};

  return (
    <div
      className={`h-[100%] w-[100%] ${lightmode ? "bg-white" : "bg-[#1e1e1e]"}`}
    >
      <div className="relative z-50">
        <Toaster
          position="top-center"
          containerStyle={{
            top: "4rem", // This is equivalent to top-12 in most cases
          }}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row w-full h-full">
          <div
            className={`h-[63vh] w-[100vw] sm:h-[100vh] sm:w-[65vw] border-b border-black `}
          >
            <CodeEditor
              value={value}
              setValue={setValue}
              language={language}
              setLanguage={setLanguage}
              boilerplatecode={boilerplatecode}
              setBoilerPlateCode={setBoilerPlateCode}
              lightmode={lightmode}
              setLightMode={setLightMode}
              handleLight={handleLight}
              folderopen={folderopen}
              setFolderOpen={setFolderOpen}
              updateChangeCode={updateChangeCode}
              zipAndDownload={zipAndDownload}
              handleFileUpload={handleFileUpload}
              shareOpen={shareOpen}
              setShareOpen={setShareOpen}
              infoOpen={infoOpen}
              setInfoOpen={setInfoOpen}
              folderfiles={folderfiles}
              setFolderFiles={setFolderFiles}
              opennewfolder={opennewfolder}
              setOpenNewFolder={setOpenNewFolder}
              folderIndex={folderIndex}
              setFolderIndex={setFolderIndex}
              fileIndex={fileIndex}
              setFileIndex={setFileIndex}
              newFolderName={newFolderName}
              setNewFolderName={setNewFolderName}
              addNewFolder={addNewFolder}
              handleFolderName={handleFolderName}
              extraFileIndex={extraFileIndex}
              setExtraFileIndex={setExtraFileIndex}
              newFileName={newFileName}
              setNewFileName={setNewFileName}
              opennewfile={opennewfile}
              setOpenNewFile={setOpenNewFile}
              openExtraNewFile={openExtraNewFile}
              setOpenExtraNewFile={setOpenExtraNewFile}
              extraNewFileName={extraNewFileName}
              setExtraNewFileName={setExtraNewFileName}
              keyboardShortcut={keyboardShortcut}
              setKeyboardShortcut={setKeyboardShortcut}
              email={email}
              setEmail={setEmail}
              outputFile={outputFile}
              setOutputFile={setOutputFile}
              initialOutput={initialOutput}
              fileChecked={fileChecked}
              setFileChecked={setFileChecked}
              setOutputChecked={setOutputChecked}
              outputChecked={outputChecked}
              toolBar={toolBar}
              setToolBar={setToolBar}
              testCases={testCases}
              setTestCases={setTestCases}
              initialTestCases={initialTestCases}
              updateDeltaChanges={updateDeltaChanges}
              deltaChanges={deltaChanges}
              setDeltaChanges={setDeltaChanges}
            />
          </div>
          <div className="sm:w-1 sm:bg-gray-300 sm:cursor-ew-resize"></div>

          <div className="h-auto w-full p-1 border-b border-black sm:h-[100vh] sm:max-md:w-[30vw] md:w-[40vw] select-none">
            <Output
              lightmode={lightmode}
              option={option}
              setOption={setOption}
              outputFile={outputFile}
              setOutputFile={setOutputFile}
              testCases={testCases}
              setTestCases={setTestCases}
              testCaseSelected={testCaseSelected}
              setTestCaseSelected={setTestCaseSelected}
            />
          </div>
        </div>
        {fileIndex !== -1 || extraFileIndex !== -1 ? (
          <div
            className={`z-20 ${
              lightmode ? "bg-gray-100" : "bg-[#1e1e1e]"
            } sm:absolute sm:bottom-0 ${
              toolBar ? "sm:ml-12 sm:w-100-minus-3rem" : "sm:w-[100%]"
            } overflow-hidden`}
            style={testCaseStyles}
          >
            <div
              className={` hidden sm:block h-0.5 w-full cursor-ns-resize ${
                lightmode ? "bg-gray-300" : "bg-slate-300"
              }`}
              onMouseDown={handleTestCaseBarResize}
            ></div>
            <div
              className={`flex p-4 pt-3 justify-between items-center h-full sm:h-auto select-none`}
            >
              <label
                className={`font-bold text-xl ${
                  lightmode ? "text-black" : "text-white"
                }`}
              >
                Test Cases :
              </label>
              <div className="flex items-center gap-4">
                {testCases.length > 1 ? (
                  <button onClick={deleteTestCase}>
                    {lightmode ? (
                      <MdDelete size={28} color="black" />
                    ) : (
                      <MdDelete size={28} color="white" />
                    )}
                  </button>
                ) : (
                  ""
                )}
                <Run
                  lightmode={lightmode}
                  outputFile={outputFile}
                  setOutputFile={setOutputFile}
                  updateChangeOutput={updateChangeOutput}
                  updateChangeCode={updateChangeCode}
                  testCases={testCases}
                  setTestCases={setTestCases}
                  sendTestCases={sendTestCases}
                  folderIndex={folderIndex}
                  fileIndex={fileIndex}
                  testCaseSelected={testCaseSelected}
                />
                <RunAll
                  lightmode={lightmode}
                  outputFile={outputFile}
                  setOutputFile={setOutputFile}
                  updateChangeOutput={updateChangeOutput}
                  updateChangeCode={updateChangeCode}
                  testCases={testCases}
                  setTestCases={setTestCases}
                  sendTestCases={sendTestCases}
                  folderIndex={folderIndex}
                  fileIndex={fileIndex}
                  testCaseSelected={testCaseSelected}
                />
              </div>
            </div>

            <TestCase
              testCases={testCases}
              setTestCases={setTestCases}
              lightmode={lightmode}
              reportBugOpen={reportBugOpen}
              setReportBugOpen={setReportBugOpen}
              testCaseSelected={testCaseSelected}
              setTestCaseSelected={setTestCaseSelected}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {shareOpen === true ? (
        <div
          className={`fixed px-2 bottom-0  sm:inset-0 w-full flex items-center justify-center backdrop-blur-sm  sm:w-auto `}
        >
          <div
            className={`sm:border border-t-2 ${
              lightmode
                ? "bg-white text-black border-black"
                : "bg-[#1e1e1e] text-white border-white"
            } p-6 rounded-lg shadow-lg relative w-full sm:w-auto`}
          >
            <button
              onClick={() => {
                setShareOpen(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Share this page</h2>
            <input
              type="text"
              value={window.location.href}
              readOnly
              className={`w-full p-2 border border-gray-300 rounded mb-4 ${
                lightmode ? "bg-white" : "bg-[#1e1e1e]"
              } `}
            />
            <button
              onClick={copyToClipboard}
              className={`${
                lightmode ? "bg-blue-500 text-white" : "bg-[#00BFFF] text-black"
              }  p-2 rounded w-full mb-4`}
            >
              Copy URL
            </button>
            <div className="flex justify-around">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={32} className="text-blue-700" />
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={32} className="text-blue-500" />
              </a>
              <a
                href="https://wa.me/?text=https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={32} className="text-green-500" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {infoOpen === true ? (
        <div className="fixed px-2 bottom-0  sm:inset-0 w-full  sm:w-auto flex items-center justify-center backdrop-blur-sm">
          <div
            className={`border ${
              lightmode
                ? "bg-white text-black  border-black"
                : "bg-[#1e1e1e] text-white border-white"
            } p-6 rounded-lg shadow-lg relative `}
          >
            <div>
              <button
                onClick={() => {
                  setInfoOpen(false);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Info</h2>
            </div>

            <div className="flex flex-col p-2 font-semibold">
              <a href="/about">About</a>
              <a href="/about">FAQ</a>
              <a href="/about">Terms and Conditions</a>
              <a href="/about">How to use</a>
              <a href="/about">Contact us</a>
            </div>

            <div className="mb-0 font-bold">
              &copy; iRoots Data and Publishing Company Private Limited
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {reportBugOpen === true ? (
        <div className="fixed bottom-0 w-full sm:w-auto sm:inset-0 flex sm:items-center sm:justify-center">
          <div
            className={`border ${
              lightmode
                ? "bg-gray-100 bg-opacity-90 text-black border-black"
                : "bg-[#1e1e1e] bg-opacity-90 text-white border-white"
            } p-6 rounded-lg shadow-lg relative w-full sm:w-[70vw]`}
          >
            <div className="flex items-center w-full justify-center">
              <button
                onClick={() => {
                  setReportBugOpen(false);
                }}
                className={`absolute top-3 right-2 ${
                  lightmode
                    ? "text-black hover:text-gray-700"
                    : "text-white hover:text-gray-200"
                }`}
              >
                <FaTimes size={24} />
              </button>
              <h2 className={`text-xl font-bold  `}>Report Bug</h2>
            </div>

            <form
              action="POST"
              className="flex flex-col gap-3 mt-4 font-semibold w-full"
            >
              <p>Tell us some details:</p>
              <label>Name :</label>
              <input
                type="text"
                placeholder="Name"
                name="Name"
                className={`p-2 border rounded-md ${
                  lightmode ? "bg-gray-200" : "bg-black"
                }`}
              ></input>
              <label>Email :</label>
              <input
                type="email"
                placeholder="Email"
                name="Email"
                className={`p-2 border rounded-md ${
                  lightmode ? "bg-gray-200" : "bg-black"
                }`}
              ></input>
              <label>Tell us what issue/bug, you met :</label>
              <textarea
                type="text"
                placeholder="Issue"
                name="Issue"
                className={`p-2 border rounded-md ${
                  lightmode ? "bg-gray-200" : "bg-black"
                }`}
                rows={6}
              ></textarea>
              <div className="flex justify-end pr-2 w-full">
                <button
                  className={`block w-24 px-2 py-1 text-center rounded ${
                    lightmode
                      ? "bg-custom-gradient"
                      : "bg-custom-gradient-inverted"
                  } text-white`}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      {keyboardShortcut === true ? (
        <KeyBoardShortcuts
          lightmode={lightmode}
          setLightMode={setLightMode}
          keyboardShortcut={keyboardShortcut}
          setKeyboardShortcut={setKeyboardShortcut}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EditorPage;