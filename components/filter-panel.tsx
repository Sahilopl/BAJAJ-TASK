"use client"

import { useEffect, useState } from "react"

interface FilterPanelProps {
  onFilterChange: (filters: {
    consultationMode: string
    specialties: string[]
    sort: string
  }) => void
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [consultationMode, setConsultationMode] = useState("")
  const [specialties, setSpecialties] = useState<string[]>([])
  const [sort, setSort] = useState("")

  const specialtiesList = [
    "General-Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist",
    "ENT", "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist",
    "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist", "Psychiatrist",
    "Urologist", "Dietitian-Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
    "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ]

  // Update filters when any filter value changes
  useEffect(() => {
    onFilterChange({ consultationMode, specialties, sort })
  }, [consultationMode, specialties, sort, onFilterChange])

  const handleSpecialtyChange = (specialty: string) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    )
  }

  return (
    <div className="space-y-6 p-4 border rounded-md shadow-sm">
      {/* Consultation Mode */}
      <div>
        <h3 className="font-bold mb-2" data-testid="filter-header-moc">
          Consultation Mode
        </h3>
        <label className="block mb-1">
          <input
            type="radio"
            name="consultationMode"
            value="Video Consult"
            data-testid="filter-video-consult"
            onChange={(e) => setConsultationMode(e.target.value)}
          />{" "}
          Video Consult
        </label>
        <label className="block">
          <input
            type="radio"
            name="consultationMode"
            value="In Clinic"
            data-testid="filter-in-clinic"
            onChange={(e) => setConsultationMode(e.target.value)}
          />{" "}
          In Clinic
        </label>
      </div>

      {/* Specialties */}
      <div>
        <h3 className="font-bold mb-2" data-testid="filter-header-speciality">
          Speciality
        </h3>
        <div className="grid grid-cols-2 gap-1">
          {specialtiesList.map((name) => (
            <label key={name} className="block">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${name}`}
                onChange={() => handleSpecialtyChange(name)}
              />{" "}
              {name.replace(/-/g, " ")}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-bold mb-2" data-testid="filter-header-sort">
          Sort By
        </h3>
        <label className="block mb-1">
          <input
            type="radio"
            name="sort"
            value="fees"
            data-testid="sort-fees"
            onChange={(e) => setSort(e.target.value)}
          />{" "}
          Fees (Low to High)
        </label>
        <label className="block">
          <input
            type="radio"
            name="sort"
            value="experience"
            data-testid="sort-experience"
            onChange={(e) => setSort(e.target.value)}
          />{" "}
          Experience (High to Low)
        </label>
      </div>
    </div>
  )
}
