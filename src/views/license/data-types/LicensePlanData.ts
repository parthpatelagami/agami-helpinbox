const LicensePlanData = [
  {
    imgWidth: 140,
    imgHeight: 140,
    title: 'Basic',
    monthlyPrice: 0,
    currentPlan: true,
    popularPlan: false,
    subtitle: 'A simple start for everyone',
    imgSrc: '/images/pages/pricing-plan-basic.png',
    yearlyPlan: {
      perMonth: 0,
      totalAnnual: 0
    },
    planBenefits: [
      '100 responses a month',
      'Unlimited forms and surveys',
      'Unlimited fields',
      'Basic form creation tools',
      'Up to 2 subdomains'
    ]
  },
  {
    imgWidth: 140,
    imgHeight: 140,
    monthlyPrice: 49,
    title: 'Standard',
    popularPlan: true,
    currentPlan: false,
    subtitle: 'For small to medium businesses',
    imgSrc: '/images/pages/pricing-plan-standard.png',
    yearlyPlan: {
      perMonth: 40,
      totalAnnual: 480
    },
    planBenefits: [
      'Unlimited responses',
      'Unlimited forms and surveys',
      'Instagram profile page',
      'Google Docs integration',
      'Custom “Thank you” page'
    ]
  },
  {
    imgWidth: 140,
    imgHeight: 140,
    monthlyPrice: 99,
    popularPlan: false,
    currentPlan: false,
    title: 'Enterprise',
    subtitle: 'Solution for big organizations',
    imgSrc: '/images/pages/pricing-plan-enterprise.png',
    yearlyPlan: {
      perMonth: 80,
      totalAnnual: 960
    },
    planBenefits: [
      'PayPal payments',
      'Logic Jumps',
      'File upload with 5GB storage',
      'Custom domain support',
      'Stripe integration'
    ]
  }
]

export default LicensePlanData
