import type { Doctor } from "@/types/doctor"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface DoctorListProps {
  doctors: Doctor[]
  isLoading: boolean
}

export default function DoctorList({ doctors, isLoading }: DoctorListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No doctors found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <Card key={doctor.id || Math.random().toString()} className="w-full hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden">
                <Image
                  src={
                    doctor.photo && doctor.photo !== "null" && doctor.photo.startsWith("http")
                      ? doctor.photo
                      : "/placeholder.svg"
                  }
                  alt={doctor.name || "Doctor"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{doctor.name || "Unknown Doctor"}</h3>
                <p className="text-muted-foreground">
                  {(doctor.specialities || []).map((s) => s.name).join(", ") || "No specialties listed"}
                </p>
                <p className="mt-1">{doctor.experience || 0}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {doctor.video_consult ? "Video Consult" : doctor.in_clinic ? "In Clinic" : "Consultation"}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                    {doctor.fees || 0}
                  </Badge>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                      {doctor.rating || 0} ★ ({doctor.reviewCount || 0} reviews)
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
