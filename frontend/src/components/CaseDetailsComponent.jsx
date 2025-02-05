// import React, {useState, useEffect} from "react";

// import FormData from "form-data";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";

// import Loader from "./Loader";

// import {superShortenWalletAddress} from "@/lib/utils";

// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const CaseDetailsComponent = ({caseID}) => {
//   const [caseDetails, setCaseDetails] = useState(null);
//   const [newProgress, setNewProgress] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [lawyers, setLawyers] = useState([]);
//   const [judgeDetails, setJudgeDetails] = useState({name: "", UID: 0});

//   const [progressIsUpdating, setProgressIsUpdating] = useState(false);
//   const [uploadDocumentDialogBoxIsOpen, setUploadDocumentDialogBoxIsOpen] =
//     useState(false);

//   const [userAddress, setUserAddress] = useState("");
//   const [isUserJudge, setIsUserJudge] = useState(false);
//   const [isUserLawyer, setIsUserLawyer] = useState(false);
//   const [isUserClient, setIsUserClient] = useState(false);

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploadingDocument, setUploadingDocument] = useState(false);


//   return (
//     <div className="flex flex-col items-center justify-center md:py-10 xs:py-5 md:min-h-auto min-h-[87vh]">
//       <div className="md:pb-10 xs:pb-3">
//         <button className="bg-blue-500 hover:bg-blue-300 text-white font-montserrat py-2 px-4 rounded text-xs md:text-base">
//           Case Details
//         </button>
//       </div>

//       <p className="md:text-2xl xs:text-xl font-montserrat md:pb-5 pb-3 text-center md:text-left md:w-[80%] w-full">
//         Case Information
//       </p>

//       <div className="md:w-[80%] w-full flex items-center justify-center pb-5 md:pb-0">
//         <table className="w-full border border-gray-200 md:text-base xs:text-xs">
//           <tbody>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 Case ID
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {caseDetails.caseId}
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 UID Of Party 1
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {caseDetails.UIDOfParty1}
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 UID Of Party 2
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {caseDetails.UIDOfParty2}
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 Filed On Date
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {caseDetails.filedOnDate.toString()}
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 Associated Lawyers
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {lawyers.map((lawyer, index) => (
//                   <li key={index} className="marker:text-blue-500">
//                     <span>
//                       {lawyer.name}{" "}
//                       <span className="text-xs">( {lawyer.uid} )</span>
//                     </span>
//                   </li>
//                 ))}
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 Associated Judge
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 <span>
//                   {judgeDetails.name}{" "}
//                   <span className="text-xs">( {judgeDetails.UID} )</span>
//                 </span>
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 Case Subject
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {caseDetails.caseSubject}
//               </td>
//             </tr>
//             <tr>
//               <td className="font-montserrat p-2 w-1/3 border border-gray-200">
//                 Latest Case Update
//               </td>
//               <td className="font-montserrat p-2 w-2/3 border border-gray-200">
//                 {caseDetails.caseProgress[caseDetails.caseProgress.length - 1]}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="md:w-[80%] w-full flex flex-col md:pt-10 xs:pt-0 pb-5 md:pb-0">
//         <div className="w-full text-center justify-between flex md:flex-row flex-col md:text-left md:text-2xl xs:text-xl font-montserrat">
//           <p className="md:text-2xl xs:text-xl font-montserrat md:pb-5 pb-2 text-center md:text-left 2xl:w-[65%] 3xl:w-[70%] w-full">
//             Case Progress
//           </p>
//           <div className="2xl:w-[35%] 3xl:w-[30%]">
//             {/* onlyJudgeIsAllowedToUpdateTheProgress */}
//             {isUserJudge ? (
//               <Dialog
//                 open={progressIsUpdating}
//                 onOpenChange={setProgressIsUpdating}
//               >
//                 <DialogTrigger asChild>
//                   <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
//                     <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
//                       Update Case Progress
//                     </button>
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="md:max-w-[500px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-5 p-5 rounded-sm">
//                   <DialogHeader>
//                     <DialogTitle>Update case progress</DialogTitle>
//                     <DialogDescription>
//                       All updates will be added to the case progress timeline.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <form onSubmit={handleCaseProgressUpdate}>
//                     <div className="flex pb-3 md:pb-5 justify-center">
//                       <textarea
//                         type="text"
//                         className="border rounded-sm py-2 px-4 w-[95%] md:text-sm text-xs"
//                         placeholder="Enter the case update here."
//                         value={newProgress}
//                         onChange={(e) => setNewProgress(e.target.value)}
//                         rows={3}
//                       />
//                     </div>
//                     <DialogFooter
//                       className={"text-center items-center justify-center"}
//                     >
//                       <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs"
//                       >
//                         Update Progress
//                       </button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             ) : isUserLawyer || isUserClient ? (
//               <Dialog
//                 open={progressIsUpdating}
//                 onOpenChange={setProgressIsUpdating}
//               >
//                 <DialogTrigger asChild>
//                   <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
//                     <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
//                       Withdraw Case
//                     </button>
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="md:max-w-[480px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-6 p-6 rounded-sm">
//                   <DialogHeader>
//                     {/* <DialogTitle>Update case progress</DialogTitle> */}
//                     <DialogDescription>
//                       <div className="md:text-base xs:text-xs">
//                         Are you sure that you want to withdraw this case ?
//                       </div>
//                       <div className="text-xs">
//                         Case termination requires client's full approval
//                       </div>
//                     </DialogDescription>
//                   </DialogHeader>
//                   <form onSubmit={hanleCaseTermination}>
//                     <DialogFooter
//                       className={
//                         "text-center items-center justify-center flex-row md:pt-2 pt-1"
//                       }
//                     >
//                       <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs md:w-1/4 w-1/3 mr-2"
//                       >
//                         Yes
//                       </button>
//                       <DialogClose asChild>
//                         <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs md:w-1/4 w-1/3">
//                           No
//                         </button>
//                       </DialogClose>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             ) : (
//               <div className="md:pb-5 pb-3 md:w-full">
//                 <button className="bg-blue-300 text-white py-2 px-4 rounded-sm text-xs md:w-full">
//                   Only judge is authorized to update case progress
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="w-full">
//           <div className="flex flex-col">
//             {createSnakePattern(caseDetails.caseProgress).map(
//               (row, rowIndex) => (
//                 <div
//                   key={rowIndex}
//                   className="flex insideLoop1 items-center w-full gap-2 md:gap-3"
//                 >
//                   {row.map((progress, index) => (
//                     <div
//                       key={index}
//                       className={`insideLoop2 md:w-1/3 w-1/2 md:min-h-[70px] min-h-[80px] p-3 md:mb-3 mb-2 border rounded-sm items-start flex ${
//                         caseDetails.caseProgress.indexOf(progress) + 1 ===
//                         caseDetails.caseProgress.length
//                           ? "bg-blue-300 animate-blink"
//                           : "bg-blue-100"
//                       } hover:border-2 hover:border-blue-500 border-white-500 border-2 cursor-pointer`}
//                     >
//                       {/* {index < row.length - 1 && (
//                         <div className="absolute top-1/2 right-0 -mr-2 w-4 h-4 bg-gray-300 rounded-full" />
//                       )} */}
//                       <div className="font-montserrat flex flex-col w-full">
//                         <div className="flex justify-between">
//                           <div className="text-xs md:text-sm order-first">
//                             {progress}
//                           </div>
//                           <div className="text-xs order-last ml-5">
//                             {caseDetails.caseProgress.indexOf(progress)}
//                           </div>
//                         </div>

//                         <div className="flex pt-1">
//                           <div className="text-xs order-first">
//                             Issued by:{" "}
//                             {superShortenWalletAddress(
//                               caseDetails.caseProgressIssuer[index]
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="md:w-[80%] w-full flex flex-col md:pt-9 xs:pt-0 font-montserrat">
//         <div className="justify-between flex md:flex-row flex-col">
//           <p className="md:text-2xl xs:text-xl font-montserrat md:pb-5 pb-2 text-center md:text-left 2xl:w-[65%] 3xl:w-[70%] w-full">
//             Case Documents
//           </p>

//           <div className="2xl:w-[35%] 3xl:w-[30%]">
//             {/* lawyers&JudgesAreAllowedtoUploadTheDocuments */}
//             {isUserJudge | isUserLawyer ? (
//               <Dialog
//                 open={uploadDocumentDialogBoxIsOpen}
//                 onOpenChange={setUploadDocumentDialogBoxIsOpen}
//               >
//                 <DialogTrigger asChild>
//                   <div className="md:pb-5 pb-3 flex md:justify-end justify-center">
//                     <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs">
//                       Upload Case Files
//                     </button>
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="md:max-w-[450px] xs:max-w-[350px] font-montserrat bg-blue-100 md:p-5 p-5 rounded-sm">
//                   <DialogHeader>
//                     <DialogTitle>Upload Case Document</DialogTitle>
//                   </DialogHeader>
//                   <form onSubmit={handleFileUpload} className="w-full">
//                     <div className="flex flex-col pb-3 md:pb-5 justify-center items-center w-full">
//                       <div className="flex rounded-sm items-center justify-center pb-2 md:w-[95%]">
//                         {imagePreview ? (
//                           <img
//                             src={imagePreview}
//                             alt="Image Preview"
//                             className="w-full md:h-[200px] h-[150px] object-cover p-1 bg-white rounded-sm"
//                           />
//                         ) : (
//                           <img
//                             src={"/dummy-image.jpg"}
//                             alt="Image Preview"
//                             className="w-full md:h-[200px] h-[150px] object-cover p-1 bg-white rounded-sm"
//                           />
//                         )}
//                       </div>

//                       <div className="flex md:w-[95%] w-full justify-center items-center">
//                         <input
//                           type="file"
//                           id="fileInput"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           className="hidden"
//                         />
//                         <label htmlFor="fileInput" className="flex w-full">
//                           <span
//                             id="file-name"
//                             className="flex bg-white w-2/3 rounded-l-sm text-center items-center justify-center md:text-sm text-xs"
//                           >
//                             {fileName}
//                           </span>
//                           <span className="bg-blue-500 hover:bg-blue-300 text-white font-montserrat py-2 px-4 w-1/3 rounded-r-sm text-center md:text-sm text-xs">
//                             Select File
//                           </span>
//                         </label>
//                       </div>
//                     </div>
//                     <DialogFooter
//                       className={"text-center items-center justify-center"}
//                     >
//                       <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-sm md:text-sm text-xs"
//                       >
//                         {uploadingDocument
//                           ? "Uploading File"
//                           : "Upload Document"}
//                       </button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             ) : (
//               <div className="md:pb-5 pb-3 md:w-full">
//                 <button className="bg-blue-300 text-white py-2 px-4 rounded-sm text-xs md:w-full ">
//                   Only lawyers are authorized to upload case documents
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex md:flex-row flex-col items-start w-full">
//           {caseDetails.caseDocumentHash.length > 0 ? (
//             <div className="flex flex-wrap">
//               <div className="grid xs:grid-cols-2 2xl:grid-cols-7 3xl:grid-cols-8 gap-2">
//                 {caseDetails.caseDocumentHash.map((imageUrl, index) => (
//                   <div
//                     key={index}
//                     className="overflow-hidden rounded-sm shadow-md transition-transform transform hover:scale-105 2xl:p-2 p-1 bg-blue-100 w-full"
//                   >
//                     <img
//                       src={`https://gateway.pinata.cloud/ipfs/${imageUrl}`}
//                       alt={`Uploaded File ${index + 1}`}
//                       className="w-full 3xl:min-h-[100px] 2xl:min-h-[90px] max-h-[80px] object-cover rounded-sm"
//                     />

//                     <div className="flex pt-2">
//                       <div className="text-xs order-first">
//                         Issued by:{" "}
//                         {superShortenWalletAddress(
//                           caseDetails.caseDocumentUploader[index]
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-xs md:text-sm">No case documents found</p>
//           )}
//         </div>
//       </div>

//       <ToastContainer
//         toastClassName={"font-montserrat bg-blue-500 text-white text-center"}
//         bodyClassName={"text-base p-3 rounded-sm"}
//       />
//     </div>
//   );
// };

// export default CaseDetailsComponent;
import React from "react";
import { superShortenWalletAddress } from "@/lib/utils";

const CaseDetailsComponent = () => {
  // Static case details data
  const caseDetails = {
    caseId: "CASE-12345",
    UIDOfParty1: "CLIENT-001",
    UIDOfParty2: "CLIENT-002",
    filedOnDate: "2024-03-15",
    associatedLawyers: ["LAWYER-001", "LAWYER-002"],
    associatedJudge: "JUDGE-001",
    caseSubject: "Property Dispute",
    caseProgress: [
      "Case filed with court",
      "Initial hearing completed",
      "Evidence submission period",
      "Final arguments heard",
      "Judgment pending"
    ],
    caseDocumentHash: [
      "QmXYZ123sampleHash1",
      "QmXYZ123sampleHash2",
      "QmXYZ123sampleHash3"
    ]
  };

  // Static lawyers data
  const lawyers = [
    { uid: "LAWYER-001", name: "John Doe", walletAddress: "0x123...abc" },
    { uid: "LAWYER-002", name: "Jane Smith", walletAddress: "0x456...def" }
  ];

  // Static judge data
  const judgeDetails = {
    name: "Judge Sarah Johnson",
    UID: "JUDGE-001",
    walletAddress: "0x789...ghi"
  };

  // Static user settings
  const isUserJudge = true;
  const isUserLawyer = false;
  const isUserClient = false;

  // Simplified snake pattern creation
  const createSnakePattern = () => {
    return [
      [caseDetails.caseProgress[0], caseDetails.caseProgress[1]],
      [caseDetails.caseProgress[2], caseDetails.caseProgress[3]],
      [caseDetails.caseProgress[4]]
    ];
  };

  return (
    <div className="flex flex-col items-center justify-center md:py-10 xs:py-5">
      <div className="md:pb-10 xs:pb-3">
        <button className="bg-blue-500 text-white font-montserrat py-2 px-4 rounded text-xs md:text-base">
          Case Details
        </button>
      </div>

      {/* Case Information Table */}
      <div className="md:w-[80%] w-full">
        <table className="w-full border border-gray-200 md:text-base xs:text-xs">
          <tbody>
            {/* Table rows with static data */}
            <tr>
              <td className="p-2 w-1/3 border">Case ID</td>
              <td className="p-2 w-2/3 border">{caseDetails.caseId}</td>
            </tr>
            <tr>
              <td className="p-2 border">Parties</td>
              <td className="p-2 border">
                <div>Party 1: {caseDetails.UIDOfParty1}</div>
                <div>Party 2: {caseDetails.UIDOfParty2}</div>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Filed On</td>
              <td className="p-2 border">{caseDetails.filedOnDate}</td>
            </tr>
            <tr>
              <td className="p-2 border">Lawyers</td>
              <td className="p-2 border">
                {lawyers.map((lawyer, index) => (
                  <div key={index}>
                    {lawyer.name} ({lawyer.uid})
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Judge</td>
              <td className="p-2 border">
                {judgeDetails.name} ({judgeDetails.UID})
              </td>
            </tr>
            <tr>
              <td className="p-2 border">Case Subject</td>
              <td className="p-2 border">{caseDetails.caseSubject}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Case Progress Section */}
      <div className="md:w-[80%] w-full mt-8">
        <h2 className="text-xl font-bold mb-4">Case Progress</h2>
        <div className="space-y-4">
          {createSnakePattern().map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((progress, index) => (
                <div
                  key={index}
                  className="flex-1 p-4 bg-blue-100 rounded border border-blue-200"
                >
                  <div className="text-sm font-semibold">{progress}</div>
                  <div className="text-xs mt-2 text-gray-600">
                    Updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Documents Section */}
      <div className="md:w-[80%] w-full mt-8">
        <h2 className="text-xl font-bold mb-4">Case Documents</h2>
        <div className="grid grid-cols-3 gap-4">
          {caseDetails.caseDocumentHash.map((hash, index) => (
            <div
              key={index}
              className="p-4 bg-blue-100 rounded border border-blue-200"
            >
              <div className="text-sm">Document {index + 1}</div>
              <div className="text-xs mt-2 text-gray-600">
                IPFS Hash: {superShortenWalletAddress(hash)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Controls */}
      <div className="mt-8 flex gap-4">
        {isUserJudge && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Progress
          </button>
        )}
        {isUserLawyer && (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Upload Document
          </button>
        )}
      </div>
    </div>
  );
};

export default CaseDetailsComponent;