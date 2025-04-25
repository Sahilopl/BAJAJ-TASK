export interface Doctor {
  id: string
  name: string
  photo?: string
  doctor_introduction?: string
  specialities: { name: string }[]
  fees: string | number
  experience: string
  video_consult: boolean
  in_clinic: boolean
  rating?: number
  reviewCount?: number
  clinic?: {
    name: string
    address: {
      locality: string
      city: string
      address_line1: string
      location: string
      logo_url?: string
    }
  }
}
