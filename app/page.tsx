"use client"
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import AutocompleteSearch from "@/components/autocomplete-search"
import FilterPanel from "@/components/filter-panel"
import DoctorList from "@/components/doctor-list"
import type { Doctor } from "@/types/doctor"


export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [searchDoctor, setSearchDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState({
    consultationMode: "",
    specialties: [] as string[],
    sort: ""
  })

  // Normalize specialties from API (array of objects)
  const normalizeSpecialties = (input: any): string[] => {
    if (Array.isArray(input)) return input.map((s: any) => s.name || "")
    return []
  }

  // Parse fees string like "₹ 500" to number
  const parseFees = (fee: any): number => {
    if (typeof fee === "string") {
      const cleaned = fee.replace(/[^\d]/g, "")
      return parseInt(cleaned, 10) || 0
    }
    return typeof fee === "number" ? fee : 0
  }

  // Parse experience string like "13 Years of experience" to number
  const parseExperience = (exp: any): number => {
    if (typeof exp === "string") {
      const cleaned = exp.match(/\d+/)
      return cleaned ? parseInt(cleaned[0], 10) : 0
    }
    return typeof exp === "number" ? exp : 0
  }

  // Fetch doctors from your API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true)
        const res = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
        if (!res.ok) throw new Error("Failed to fetch doctor data")
        const data: Doctor[] = await res.json()
        setDoctors(data)
        setFilteredDoctors(data)
        setIsLoading(false)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
        setIsLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let updated = [...doctors]

    if (filters.consultationMode) {
      if (filters.consultationMode === "Video Consult") {
        updated = updated.filter((doc) => doc.video_consult)
      } else if (filters.consultationMode === "In Clinic") {
        updated = updated.filter((doc) => doc.in_clinic)
      }
    }

    if (filters.specialties.length > 0) {
      updated = updated.filter((doc) => {
        const spec = normalizeSpecialties(doc.specialities)
        return filters.specialties.some((s) => spec.includes(s))
      })
    }

    if (filters.sort === "fees") {
      updated.sort((a, b) => parseFees(a.fees) - parseFees(b.fees))
    } else if (filters.sort === "experience") {
      updated.sort((a, b) => parseExperience(b.experience) - parseExperience(a.experience))
    }

    setFilteredDoctors(updated)
  }, [filters, doctors])

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="text-red-500 font-semibold text-center">
          ❌ {error}
        </div>
      )}

      <AutocompleteSearch
        doctors={doctors}
        onSelectDoctor={(doc) => setSearchDoctor(doc)}
      />

      <FilterPanel onFilterChange={setFilters} />

      <DoctorList
        doctors={searchDoctor ? [searchDoctor] : filteredDoctors}
        isLoading={isLoading}
      />
    </div>
  )
}
