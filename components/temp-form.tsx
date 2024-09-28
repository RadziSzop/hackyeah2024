"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TempForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    socialSecurityNumber: "",
    dateOfBirth: "",
    filingStatus: "",
    annualIncome: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-grow pr-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-950">Tax Form</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="fullName">Imię i nazwisko</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="socialSecurityNumber">PESEL</Label>
          <Input
            id="socialSecurityNumber"
            name="socialSecurityNumber"
            value={formData.socialSecurityNumber}
            onChange={handleFormChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Data urodzenia</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleFormChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="filingStatus">Status</Label>
          <Input
            id="filingStatus"
            name="filingStatus"
            value={formData.filingStatus}
            onChange={handleFormChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="annualIncome">Przychód roczny</Label>
          <Input
            id="annualIncome"
            name="annualIncome"
            type="number"
            value={formData.annualIncome}
            onChange={handleFormChange}
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-950 text-white hover:bg-blue-900"
        >
          Prześlij formularz
        </Button>
      </form>
    </div>
  );
}
