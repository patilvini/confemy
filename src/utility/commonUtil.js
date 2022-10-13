export const capitalize = (word) => {
  return word[0]?.toUpperCase() + word.slice(1).toLowerCase();
};

export const professions = [
  { value: "physician", label: "Physician" },
  { value: "physicianAssistant", label: "Physician Assistant" },
  { value: "nursePractitioner", label: "Nurse Practitioner" },
  { value: "dentist", label: "Dentist" },
  { value: "nurse", label: "Nurse" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "physicalTherapist", label: "Physical Therapist" },
  { value: "occupationalTherapist", label: "Occupational Therapist" },
  { value: "speechTherapist", label: "Speech Therapist" },
  { value: "respiratoryTherapist", label: "Respiratory Therapist" },
  { value: "dietitian", label: "Dietitian" },
  { value: "socialWorker", label: "Social Worker" },
  { value: "caseManagement", label: "Case Management" },
];

export const subspecialties = [
  { value: "cardiology", label: "Cardiology" },
  { value: "intensivist", label: "Intensivist" },
  { value: "gastroenterologist", label: "Gastroenterologist" },
  { value: "dermatologist", label: "Dermatologist" },
  { value: "neurologist", label: "Neurologist" },
  { value: "hematologist", label: "Hematologist" },
  { value: "endodontist", label: "Endodontist" },
  { value: "orthodontist", label: "Orthodontist" },
];
