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
    label: 'Tickets',
    icon: 'carbon:home',
    children: [
      {
        label: 'View All Tickets',
        href: '/tickets/viewalltickets'
      },
      {
        label: 'View All Tickets 2',
        href: '/tickets/viewalltickets2'
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
  },
  {
    label: 'WorkFlow',
    icon: 'tabler-grid-dots',
    href: '/work-flow'
  },
  {
    label: 'SLA',
    icon: 'tabler-list-tree',
    href: '/sla'
  },
  {
    label: 'Custom Form',
    icon: 'tabler-layout-2',
    href: '/custom-form'
  },
  {
    label: 'Ticket Alert',
    icon: 'custom-ticket-alert',
    href: '/ticket-alert'
  },
  {
    label: 'License',
    icon: 'tabler-license',
    href: '/license'
  }
]

export default verticalMenuData
