import React from 'react';
import { useSystem } from '@ohif/core';
import usePatientInfo from '../../hooks/usePatientInfo';

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

// Innowave: patient DOB arrives formatted as "DD-Mon-YYYY"; derive a plain age for the header.
const calculateAge = dob => {
  if (!dob) {
    return null;
  }
  const parts = dob.split('-');
  if (parts.length !== 3) {
    return null;
  }
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];
  const day = parseInt(parts[0]);
  const month = monthNames.findIndex(m => m.startsWith(parts[1].toLowerCase()));
  const year = parseInt(parts[2]);
  if (month === -1 || Number.isNaN(day) || Number.isNaN(year)) {
    return null;
  }
  const birthDate = new Date(year, month, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function PatientInfo() {
  const { patientInfo } = usePatientInfo();

  const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
  const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);
  const patientAge = calculateAge(patientInfo.PatientDOB);

  return (
    <div className="flex flex-row items-center gap-0 rounded-md border border-gray-700 bg-gray-900">
      <div className="flex flex-col justify-center border-r border-gray-600 px-4 py-2">
        <div className="text-[9px] text-gray-400">Name</div>
        <div className="text-[11px] font-bold text-white">{formattedPatientName}</div>
      </div>
      <div className="flex flex-col justify-center border-r border-gray-600 px-4 py-2">
        <div className="text-[9px] text-gray-400">ID</div>
        <div className="text-[11px] font-bold text-white">{formattedPatientID}</div>
      </div>
      <div className="flex flex-col justify-center px-4 py-2">
        <div className="text-[9px] text-gray-400">Age</div>
        <div className="text-[11px] font-bold text-white">{patientAge ?? 'N/A'}</div>
      </div>
    </div>
  );
}

/**
 * Patient name/ID/sex/DOB, shipped as one of the `ohif.headerRightSide` items.
 * Like every item in that list it takes no props, and it renders nothing when
 * `showPatientInfo` is `disabled` — the header slot collapses with it.
 *
 * The visibility check lives out here rather than inside `PatientInfo` so that
 * `disabled` never mounts the body: `usePatientInfo` subscribes to display set
 * events and recomputes on every batch, which is wasted work when the result is
 * always `null`.
 */
function HeaderPatientInfo() {
  const { extensionManager } = useSystem();
  const { showPatientInfo } = extensionManager.appConfig;

  if (showPatientInfo === PatientInfoVisibility.DISABLED) {
    return null;
  }

  return <PatientInfo />;
}

export default HeaderPatientInfo;
