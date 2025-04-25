// components/autocomplete-search.tsx

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Doctor } from "@/types/doctor"

interface AutocompleteSearchProps {
  doctors: Doctor[]
  onSelectDoctor: (doctor: Doctor) => void
}

export default function AutocompleteSearch({
  doctors,
  onSelectDoctor,
}: AutocompleteSearchProps) {
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState<Doctor[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    const matches = doctors
      .filter((doc) =>
        doc.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 3) // show top 3 suggestions

    setFiltered(matches)
  }

  const handleSelect = (doctor: Doctor) => {
    setQuery(doctor.name)
    onSelectDoctor(doctor)
    setFiltered([]) // hide suggestions after selection
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        data-testid="autocomplete-input"
        type="text"
        placeholder="Search doctor by name"
        value={query}
        onChange={handleChange}
        className="w-full"
      />
      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow-md mt-1">
          {filtered.map((doc) => (
            <li
              key={doc.id}
              data-testid="suggestion-item"
              onClick={() => handleSelect(doc)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
