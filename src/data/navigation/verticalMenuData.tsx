// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Dashboards',
    icon: 'carbon:home',
    children: [
      {
        label: 'CRM Dashboard',
        href: '/dashboards/crm'
      }
    ]
  },
  {
<<<<<<< main
    label: 'Tickets',
    icon: 'carbon:home',
    children: [
      {
        label: 'View All Tickets',
        href: '/tickets/viewalltickets'
      },
      {
        label: 'Reply Page 1',
        href: '/tickets/replypage1'
      },
      {
        label: 'Reply Page 2',
        href: '/tickets/replypage2'
      }
    ]
  },
  {
    label: 'Tarrif Plan',
    icon: 'carbon:home',
    href: '/tarrifplan'
=======
    label: 'WorkFlow',
    icon: 'tabler-grid-dots',
    children: [
      {
        label: 'WorkFlow',
        href: '/work-flow'
      }
    ]
>>>>>>> bd47ad9 workFlow Dashboard
  }
]

export default verticalMenuData
