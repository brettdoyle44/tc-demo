"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const EHR_OPTIONS = [
  { id: "epic", name: "Epic", description: "Epic Systems Corporation" },
  {
    id: "oracle",
    name: "Oracle Health",
    description: "Oracle Health (formerly Cerner)",
  },
  { id: "kipu", name: "Kipu", description: "Kipu Health" },
  { id: "ecw", name: "eClinicalWorks", description: "eClinicalWorks" },
];

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [selectedEHR, setSelectedEHR] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleEHRSelect = (ehrId: string) => {
    setSelectedEHR(ehrId);
    setStep(2);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(username, password);
    if (success) {
      router.push("/refer");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Welcome to Throughcare
        </h1>
        {step === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>Select Your EHR</CardTitle>
              <CardDescription>
                Choose your Electronic Health Record system to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EHR_OPTIONS.map((ehr) => (
                  <Card
                    key={ehr.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedEHR === ehr.id ? "border-primary" : ""
                    }`}
                    onClick={() => handleEHRSelect(ehr.id)}
                  >
                    <CardHeader>
                      <CardTitle>{ehr.name}</CardTitle>
                      <CardDescription>{ehr.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                Login to{" "}
                {EHR_OPTIONS.find((ehr) => ehr.id === selectedEHR)?.name}
              </CardTitle>
              <CardDescription>
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="text-sm text-red-500 mb-4">{error}</div>
                )}
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
