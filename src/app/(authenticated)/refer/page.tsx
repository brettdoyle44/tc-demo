"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type SearchMethod = "nameAndDob" | "mrn" | null;
type PhiField =
  | "SSN"
  | "Insurance"
  | "BMI"
  | "Latest Labs"
  | "Latest Clinical Notes";

// Top 15 medical specialties by popularity
const specialties = [
  "Primary Care",
  "Internal Medicine",
  "Pediatrics",
  "Cardiology",
  "Orthopedics",
  "Obstetrics & Gynecology",
  "Dermatology",
  "Neurology",
  "Psychiatry",
  "Ophthalmology",
  "ENT (Otolaryngology)",
  "Gastroenterology",
  "Endocrinology",
  "Oncology",
  "Urology",
];

// Mock provider data
const mockProviders = {
  Cardiology: [
    {
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      address: "123 Heart Center Drive, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Cardiology",
      address: "456 Medical Plaza, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. James Williams",
      specialty: "Cardiology",
      address: "789 Healthcare Blvd, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Emily Thompson",
      specialty: "Cardiology",
      address: "321 Cardiac Way, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Robert Kim",
      specialty: "Cardiology",
      address: "654 Medical Center Drive, Suite 500, San Francisco, CA 94121",
    },
  ],
  "Primary Care": [
    {
      name: "Dr. Lisa Johnson",
      specialty: "Primary Care",
      address: "111 Family Practice Lane, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. David Martinez",
      specialty: "Primary Care",
      address: "222 Wellness Drive, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Jennifer Lee",
      specialty: "Primary Care",
      address: "333 Health Avenue, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Thomas Anderson",
      specialty: "Primary Care",
      address: "444 Care Circle, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Maria Garcia",
      specialty: "Primary Care",
      address: "555 Prevention Plaza, Suite 500, San Francisco, CA 94121",
    },
  ],
  "Internal Medicine": [
    {
      name: "Dr. Richard Patel",
      specialty: "Internal Medicine",
      address: "101 Medical Arts Building, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Amanda Wong",
      specialty: "Internal Medicine",
      address: "202 Healthcare Center, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Benjamin Foster",
      specialty: "Internal Medicine",
      address: "303 Wellness Complex, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Sofia Ramirez",
      specialty: "Internal Medicine",
      address: "404 Medical Tower, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Daniel Chang",
      specialty: "Internal Medicine",
      address: "505 Physicians Plaza, Suite 500, San Francisco, CA 94121",
    },
  ],
  Pediatrics: [
    {
      name: "Dr. Rachel Green",
      specialty: "Pediatrics",
      address: "123 Children's Way, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Marcus Johnson",
      specialty: "Pediatrics",
      address: "234 Kids Care Plaza, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Jessica Liu",
      specialty: "Pediatrics",
      address: "345 Pediatric Center, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. William Taylor",
      specialty: "Pediatrics",
      address: "456 Child Health Bldg, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Isabella Santos",
      specialty: "Pediatrics",
      address: "567 Youth Medical, Suite 500, San Francisco, CA 94121",
    },
  ],
  Orthopedics: [
    {
      name: "Dr. Andrew Miller",
      specialty: "Orthopedics",
      address: "789 Bone & Joint Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Patricia Chen",
      specialty: "Orthopedics",
      address: "890 Sports Medicine Plaza, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Kevin Washington",
      specialty: "Orthopedics",
      address: "901 Orthopedic Institute, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Michelle Park",
      specialty: "Orthopedics",
      address: "112 Joint Care Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Christopher Lee",
      specialty: "Orthopedics",
      address: "223 Spine Center Drive, Suite 500, San Francisco, CA 94121",
    },
  ],
  "Obstetrics & Gynecology": [
    {
      name: "Dr. Sarah Martinez",
      specialty: "Obstetrics & Gynecology",
      address: "321 Women's Health Way, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. David Wilson",
      specialty: "Obstetrics & Gynecology",
      address: "432 Maternity Plaza, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Elizabeth Chen",
      specialty: "Obstetrics & Gynecology",
      address: "543 OB/GYN Center, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Michael Brown",
      specialty: "Obstetrics & Gynecology",
      address: "654 Women's Care Bldg, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Jennifer Patel",
      specialty: "Obstetrics & Gynecology",
      address: "765 Prenatal Plaza, Suite 500, San Francisco, CA 94121",
    },
  ],
  Dermatology: [
    {
      name: "Dr. Rebecca Kim",
      specialty: "Dermatology",
      address: "444 Skin Care Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Jonathan Taylor",
      specialty: "Dermatology",
      address: "555 Dermatology Plaza, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Emily Nguyen",
      specialty: "Dermatology",
      address: "666 Skin Health Bldg, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Alexander White",
      specialty: "Dermatology",
      address: "777 Cosmetic Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Sophia Lee",
      specialty: "Dermatology",
      address: "888 Dermatology Institute, Suite 500, San Francisco, CA 94121",
    },
  ],
  Neurology: [
    {
      name: "Dr. James Chen",
      specialty: "Neurology",
      address: "741 Brain & Spine Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Maria Rodriguez",
      specialty: "Neurology",
      address: "852 Neuroscience Plaza, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Robert Wilson",
      specialty: "Neurology",
      address: "963 Neurological Institute, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Laura Kim",
      specialty: "Neurology",
      address: "174 Headache Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Michael Chang",
      specialty: "Neurology",
      address: "285 Memory Care Drive, Suite 500, San Francisco, CA 94121",
    },
  ],
  Psychiatry: [
    {
      name: "Dr. Emma Thompson",
      specialty: "Psychiatry",
      address: "159 Mental Health Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. David Park",
      specialty: "Psychiatry",
      address: "268 Behavioral Health, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Sarah Lee",
      specialty: "Psychiatry",
      address: "377 Wellness Mind, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. John Martinez",
      specialty: "Psychiatry",
      address: "486 Psychiatric Care, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Rachel Cohen",
      specialty: "Psychiatry",
      address: "595 Mental Wellness, Suite 500, San Francisco, CA 94121",
    },
  ],
  Ophthalmology: [
    {
      name: "Dr. William Lee",
      specialty: "Ophthalmology",
      address: "951 Vision Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Jennifer Chen",
      specialty: "Ophthalmology",
      address: "842 Eye Institute, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Michael Kim",
      specialty: "Ophthalmology",
      address: "733 Optical Plaza, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Sarah Wilson",
      specialty: "Ophthalmology",
      address: "624 Retina Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. David Chang",
      specialty: "Ophthalmology",
      address: "515 Eye Care Bldg, Suite 500, San Francisco, CA 94121",
    },
  ],
  "ENT (Otolaryngology)": [
    {
      name: "Dr. Robert Park",
      specialty: "ENT (Otolaryngology)",
      address: "357 ENT Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Michelle Lee",
      specialty: "ENT (Otolaryngology)",
      address: "468 Ear Nose Throat, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Thomas Chen",
      specialty: "ENT (Otolaryngology)",
      address: "579 Head & Neck Institute, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Lisa Kim",
      specialty: "ENT (Otolaryngology)",
      address: "680 Sinus Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. James Wilson",
      specialty: "ENT (Otolaryngology)",
      address: "791 Hearing Center, Suite 500, San Francisco, CA 94121",
    },
  ],
  Gastroenterology: [
    {
      name: "Dr. Daniel Martinez",
      specialty: "Gastroenterology",
      address: "147 Digestive Health, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Emily Chen",
      specialty: "Gastroenterology",
      address: "258 GI Center, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Andrew Kim",
      specialty: "Gastroenterology",
      address: "369 Endoscopy Plaza, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Jessica Lee",
      specialty: "Gastroenterology",
      address: "470 Liver Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Michael Wong",
      specialty: "Gastroenterology",
      address: "581 Digestive Disease, Suite 500, San Francisco, CA 94121",
    },
  ],
  Endocrinology: [
    {
      name: "Dr. Linda Park",
      specialty: "Endocrinology",
      address: "753 Diabetes Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Steven Chen",
      specialty: "Endocrinology",
      address: "864 Hormone Health, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. Karen Lee",
      specialty: "Endocrinology",
      address: "975 Thyroid Center, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Richard Kim",
      specialty: "Endocrinology",
      address: "186 Metabolic Institute, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Michelle Wong",
      specialty: "Endocrinology",
      address: "297 Endocrine Care, Suite 500, San Francisco, CA 94121",
    },
  ],
  Oncology: [
    {
      name: "Dr. John Chen",
      specialty: "Oncology",
      address: "852 Cancer Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Patricia Kim",
      specialty: "Oncology",
      address: "963 Oncology Institute, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. William Lee",
      specialty: "Oncology",
      address: "174 Treatment Center, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Sarah Martinez",
      specialty: "Oncology",
      address: "285 Cancer Care, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Robert Wong",
      specialty: "Oncology",
      address: "396 Hematology Onc, Suite 500, San Francisco, CA 94121",
    },
  ],
  Urology: [
    {
      name: "Dr. Thomas Lee",
      specialty: "Urology",
      address: "951 Urology Center, Suite 100, San Francisco, CA 94110",
    },
    {
      name: "Dr. Maria Chen",
      specialty: "Urology",
      address: "842 Kidney Stone Center, Suite 200, San Francisco, CA 94115",
    },
    {
      name: "Dr. David Kim",
      specialty: "Urology",
      address: "733 Men's Health Plaza, Suite 300, San Francisco, CA 94117",
    },
    {
      name: "Dr. Jennifer Park",
      specialty: "Urology",
      address: "624 Continence Center, Suite 400, San Francisco, CA 94118",
    },
    {
      name: "Dr. Michael Wilson",
      specialty: "Urology",
      address: "515 Prostate Center, Suite 500, San Francisco, CA 94121",
    },
  ],
};

// Mock patient data - in a real app this would come from an API
const mockPatient = {
  mrn: "123456",
  firstName: "Jeffrey",
  lastName: "Lebowski",
  dateOfBirth: "10/10/1962",
  address: "905 Loma Vista Dr., Beverly Hills",
};

export default function ReferPatientPage() {
  const [step, setStep] = useState(1);
  const [searchMethod, setSearchMethod] = useState<SearchMethod>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mrn: "",
  });
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<
    (typeof mockProviders.Cardiology)[0] | null
  >(null);
  const [selectedPatient, setSelectedPatient] = useState<
    typeof mockPatient | null
  >(null);
  const [referralDetails, setReferralDetails] = useState({
    dx: "",
    message: "",
    sendPhi: false,
  });
  const [selectedPhiFields, setSelectedPhiFields] = useState<PhiField[]>([]);

  const handleMethodSelect = (method: SearchMethod) => {
    setSearchMethod(method);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      setStep(2);
    } else {
      setStep(1);
      setSearchMethod(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to search for the patient
    setSelectedPatient(mockPatient);
    setStep(3);
  };

  const handlePatientSelect = () => {
    setStep(4);
  };

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
  };

  const handleProviderSelect = (provider: typeof selectedProvider) => {
    setSelectedProvider(provider);
    setStep(5);
  };

  const handleReferralDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReferralDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhiChange = (checked: boolean) => {
    setReferralDetails((prev) => ({
      ...prev,
      sendPhi: checked,
    }));
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referralDetails.sendPhi) {
      setStep(6);
    } else {
      setStep(7);
    }
  };

  const handlePhiFieldsChange = (field: PhiField) => {
    setSelectedPhiFields((prev) => {
      if (prev.includes(field)) {
        return prev.filter((f) => f !== field);
      }
      return [...prev, field];
    });
  };

  const handlePhiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final submission here
    console.log("Referral submitted with PHI:", {
      patient: selectedPatient,
      provider: selectedProvider,
      referralDetails,
      phiFields: selectedPhiFields,
    });
    setStep(7);
  };

  const PatientInfoCard = ({
    patient,
    isCompact = false,
  }: {
    patient: typeof mockPatient;
    isCompact?: boolean;
  }) => (
    <Card
      className={
        isCompact
          ? "bg-muted"
          : "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
      }
    >
      <CardContent className={isCompact ? "pt-4" : ""}>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">First Name</dt>
            <dd className="text-sm font-medium">{patient.firstName}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">Last Name</dt>
            <dd className="text-sm font-medium">{patient.lastName}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">MRN</dt>
            <dd className="text-sm font-medium">{patient.mrn}</dd>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">Date of Birth</dt>
            <dd className="text-sm font-medium">{patient.dateOfBirth}</dd>
          </div>
          <div className="col-span-2 space-y-1">
            <dt className="text-sm text-gray-500">Address</dt>
            <dd className="text-sm font-medium">{patient.address}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );

  const ProviderCard = ({
    provider,
  }: {
    provider: (typeof mockProviders.Cardiology)[0];
  }) => (
    <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{provider.name}</h3>
            <p className="text-sm text-gray-500">{provider.specialty}</p>
          </div>
          <p className="text-sm">{provider.address}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {step === 4
          ? "Start your referral"
          : step === 5
          ? "Complete Referral"
          : step === 6
          ? "Additional Information"
          : step === 7
          ? "Referral Submitted"
          : "Refer Patient"}
      </h1>
      {step === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => handleMethodSelect("nameAndDob")}
          >
            <CardHeader>
              <CardTitle>Patient Name and DOB</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Search for a patient using their name and date of birth
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={() => handleMethodSelect("mrn")}
          >
            <CardHeader>
              <CardTitle>Patient MRN</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Search for a patient using their Medical Record Number
              </p>
            </CardContent>
          </Card>
        </div>
      ) : step === 2 ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {searchMethod === "nameAndDob"
                ? "Enter Patient Details"
                : "Enter Patient MRN"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {searchMethod === "nameAndDob" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="dateOfBirth"
                      className="text-sm font-medium"
                    >
                      Date of Birth
                    </label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="mrn" className="text-sm font-medium">
                    Medical Record Number (MRN)
                  </label>
                  <Input
                    id="mrn"
                    name="mrn"
                    value={formData.mrn}
                    onChange={handleInputChange}
                    placeholder="Enter MRN"
                    required
                  />
                </div>
              )}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="cursor-pointer"
                >
                  Back
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : step === 3 ? (
        <div>
          <Card
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
            onClick={handlePatientSelect}
          >
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Click to select this patient</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientInfoCard patient={selectedPatient!} />
            </CardContent>
          </Card>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="cursor-pointer"
            >
              Back
            </Button>
          </div>
        </div>
      ) : step === 4 ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Current Patient Selected
            </h2>
            <PatientInfoCard patient={selectedPatient!} isCompact />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Select Provider</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select
                      value={selectedSpecialty}
                      onValueChange={handleSpecialtyChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSpecialty &&
                    mockProviders[
                      selectedSpecialty as keyof typeof mockProviders
                    ] && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Available Providers
                        </h3>
                        <div className="grid gap-4">
                          {mockProviders[
                            selectedSpecialty as keyof typeof mockProviders
                          ].map((provider, index) => (
                            <div
                              key={index}
                              onClick={() => handleProviderSelect(provider)}
                            >
                              <ProviderCard provider={provider} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="cursor-pointer"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : step === 5 ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Current Patient Selected
            </h2>
            <PatientInfoCard patient={selectedPatient!} isCompact />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Selected Provider</h2>
            <ProviderCard provider={selectedProvider!} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Referral Details</h2>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleReferralSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dx">DX (Reason for referral)</Label>
                    <Input
                      id="dx"
                      name="dx"
                      value={referralDetails.dx}
                      onChange={handleReferralDetailsChange}
                      placeholder="Enter diagnosis or reason for referral"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={referralDetails.message}
                      onChange={handleReferralDetailsChange}
                      placeholder="Enter any additional notes or messages"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendPhi"
                      checked={referralDetails.sendPhi}
                      onCheckedChange={handlePhiChange}
                    />
                    <Label htmlFor="sendPhi">
                      I&apos;d like to send this provider PHI
                    </Label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="cursor-pointer"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="cursor-pointer">
                      Submit Referral
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : step === 6 ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Current Patient Selected
            </h2>
            <PatientInfoCard patient={selectedPatient!} isCompact />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Selected Provider</h2>
            <ProviderCard provider={selectedProvider!} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              What would you like to add to this referral?
            </h2>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handlePhiSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {(
                      [
                        "SSN",
                        "Insurance",
                        "BMI",
                        "Latest Labs",
                        "Latest Clinical Notes",
                      ] as PhiField[]
                    ).map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <Checkbox
                          id={field}
                          checked={selectedPhiFields.includes(field)}
                          onCheckedChange={() => handlePhiFieldsChange(field)}
                        />
                        <Label htmlFor={field}>{field}</Label>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="cursor-pointer"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="cursor-pointer">
                      Submit
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-green-600">
                  Thank you for your referral!
                </h2>
                <p className="text-gray-600">
                  Your referral has been successfully submitted to{" "}
                  {selectedProvider?.name}.
                </p>
                <p className="text-gray-600">
                  We will notify you once the provider has reviewed the
                  referral.
                </p>
                <div className="pt-6">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setSearchMethod(null);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        dateOfBirth: "",
                        mrn: "",
                      });
                      setSelectedSpecialty("");
                      setSelectedProvider(null);
                      setSelectedPatient(null);
                      setReferralDetails({
                        dx: "",
                        message: "",
                        sendPhi: false,
                      });
                      setSelectedPhiFields([]);
                    }}
                    className="cursor-pointer"
                  >
                    Start New Referral
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
