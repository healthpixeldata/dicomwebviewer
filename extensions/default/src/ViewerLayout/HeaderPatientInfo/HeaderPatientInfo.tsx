// import React, { useState, useEffect } from 'react';
// import usePatientInfo from '../../hooks/usePatientInfo';
// import { Icons } from '@ohif/ui-next';

// export enum PatientInfoVisibility {
//   VISIBLE = 'visible',
//   VISIBLE_COLLAPSED = 'visibleCollapsed',
//   DISABLED = 'disabled',
//   VISIBLE_READONLY = 'visibleReadOnly',
// }

// const formatWithEllipsis = (str, maxLength) => {
//   if (str?.length > maxLength) {
//     return str.substring(0, maxLength) + '...';
//   }
//   return str;
// };

// function HeaderPatientInfo({ servicesManager, appConfig }: withAppTypes) {
//   const initialExpandedState =
//     appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE ||
//     appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE_READONLY;
//   const [expanded, setExpanded] = useState(initialExpandedState);
//   const { patientInfo, isMixedPatients } = usePatientInfo(servicesManager);

//   useEffect(() => {
//     if (isMixedPatients && expanded) {
//       setExpanded(false);
//     }
//   }, [isMixedPatients, expanded]);

//   const handleOnClick = () => {
//     if (!isMixedPatients && appConfig.showPatientInfo !== PatientInfoVisibility.VISIBLE_READONLY) {
//       setExpanded(!expanded);
//     }
//   };

//   const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
//   const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);

//   return (
//     <div
//       className="hover:bg-primary-dark flex cursor-pointer items-center justify-center gap-1 rounded-lg"
//       onClick={handleOnClick}
//     >
//       {isMixedPatients ? (
//         <Icons.MultiplePatients className="text-primary" />
//       ) : (
//         <Icons.Patient className="text-primary" />
//       )}
//       <div className="flex flex-col justify-center">
//         {expanded ? (
//           <>
//             <div className="self-start text-[13px] font-bold text-white">
//               {formattedPatientName}
//             </div>
//             <div className="text-aqua-pale flex gap-2 text-[11px]">
//               <div>{formattedPatientID}</div>
//               <div>{patientInfo.PatientSex}</div>
//               <div>{patientInfo.PatientDOB}</div>
//             </div>
//           </>
//         ) : (
//           <div className="text-primary self-center text-[13px]">
//             {isMixedPatients ? 'Multiple Patients' : 'Patient'}
//           </div>
//         )}
//       </div>
//       <Icons.ArrowLeft className={`text-primary ${expanded ? 'rotate-180' : ''}`} />
//     </div>
//   );
// }

// export default HeaderPatientInfo;



import React, { useState, useEffect } from 'react';
import usePatientInfo from '../../hooks/usePatientInfo';
import { Icons } from '@ohif/ui-next';

export enum PatientInfoVisibility {
  VISIBLE = 'visible',
  VISIBLE_COLLAPSED = 'visibleCollapsed',
  DISABLED = 'disabled',
  VISIBLE_READONLY = 'visibleReadOnly',
}

const formatWithEllipsis = (str, maxLength) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};
const calculateAge = (dob) => {
  if (!dob) return null;
  
  // Parse the date string (format: DD-Month-YYYY)
  const parts = dob.split('-');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0]);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames.findIndex(m => m.toLowerCase().startsWith(parts[1].toLowerCase()));
  const year = parseInt(parts[2]);
  
  if (month === -1) return null;
  
  const birthDate = new Date(year, month, day);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

function HeaderPatientInfo({ servicesManager, appConfig }: withAppTypes) {
  // const initialExpandedState =
  //   appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE ||
  //   appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE_READONLY;
  // const [expanded, setExpanded] = useState(true);
  const { patientInfo, isMixedPatients } = usePatientInfo(servicesManager);

  // useEffect(() => {
  //   if (isMixedPatients && expanded) {
  //     setExpanded(false);
  //   }
  // }, [isMixedPatients, expanded]);


  // const handleOnClick = () => {
  //   if (!isMixedPatients && appConfig.showPatientInfo !== PatientInfoVisibility.VISIBLE_READONLY) {
  //     setExpanded(!expanded);
  //   }
  // };

  const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
  const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);
const patientAge = calculateAge(patientInfo.PatientDOB);
  // return (
  //   <div
  //     className="patient-menu hover:bg-primary-dark flex cursor-pointer items-center justify-center gap-1 rounded-lg"
  //     onClick={handleOnClick}
  //   >
  //     {isMixedPatients ? (
  //       <Icons.MultiplePatients className="text-primary" />
  //     ) : (
  //       <Icons.Patient className="text-primary" />
  //     )}
  //     <div className="patient-menu-box flex flex-col justify-center">
  //       {expanded ? (
  //         <>
  //           <div className="self-start text-[13px] font-bold text-white">
  //             {formattedPatientName}
  //           </div>
  //           <div className="text-aqua-pale flex gap-2 text-[11px]">
  //             <div>{formattedPatientID}</div>
  //             <div>{patientInfo.PatientSex}</div>
  //             <div>{patientInfo.PatientDOB}</div>
  //           </div>
  //         </>
  //       ) : (
  //         <div className="text-primary self-center text-[13px]">
  //           {isMixedPatients ? 'Multiple Patients' : 'Patient'}
  //         </div>
  //       )}
  //     </div>
  //     <Icons.ArrowLeft className={`text-primary ${expanded ? 'rotate-180' : ''}`} />
  //   </div>
  // );
  // return (
  //   <div className="flex flex-row items-center gap-0">
  //     {/* Name Section */}
  //     <div className="flex flex-col justify-center px-4 py-2 border-r border-gray-600">
  //       <div className="text-[9px] text-gray-400">Name</div>
  //       <div className="text-[11px] font-bold text-white">{formattedPatientName}</div>
  //     </div>

  //     {/* ID Section */}
  //     <div className="flex flex-col justify-center px-4 py-2 border-r border-gray-600">
  //       <div className="text-[9px] text-gray-400">ID</div>
  //       <div className="text-[11px] font-bold text-white">{formattedPatientID}</div>
  //     </div>

  //     {/* Age Section */}
  //     <div className="flex flex-col justify-center px-4 py-2">
  //       <div className="text-[9px] text-gray-400">Age</div>
  //       <div className="text-[11px] font-bold text-white">{patientAge || 'N/A'}</div>
  //     </div>
  //   </div>
  // );
  return (
  <div className="bg-gray-900 border border-gray-700 rounded-md flex flex-row items-center gap-0">
    {/* Name Section */}
    <div className="flex flex-col justify-center px-4 py-2 border-r border-gray-600">
      <div className="text-[9px] text-gray-400">Name</div>
      <div className="text-[11px] font-bold text-white">{formattedPatientName}</div>
    </div>

    {/* ID Section */}
    <div className="flex flex-col justify-center px-4 py-2 border-r border-gray-600">
      <div className="text-[9px] text-gray-400">ID</div>
      <div className="text-[11px] font-bold text-white">{formattedPatientID}</div>
    </div>

    {/* Age Section */}
    <div className="flex flex-col justify-center px-4 py-2">
      <div className="text-[9px] text-gray-400">Age</div>
      <div className="text-[11px] font-bold text-white">{patientAge || 'N/A'}</div>
    </div>
  </div>
);
  
}

export default HeaderPatientInfo;
