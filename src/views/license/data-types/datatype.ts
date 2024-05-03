export type LicensePlanType = {
  title: string
  imgSrc: string
  subtitle: string
  imgWidth?: number
  imgHeight?: number
  currentPlan: boolean
  popularPlan: boolean
  monthlyPrice: number
  planBenefits: string[]
  yearlyPlan: {
    perMonth: number
    totalAnnual: number
  }
}

export type LicensePlanProps = {
  plan: string
  data?: LicensePlanType
}

export type LicenseDataType = {
  pricingPlans: LicensePlanType[]
}
