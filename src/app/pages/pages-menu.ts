import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'MENU.DASHBOARD',
    icon: 'activity-outline',
    link: '/pages/dashboard'
  },
  {
    title: 'MENU.USERS',
    icon: 'person-outline',
    children: [
      {
        title: 'MENU.ADD_NEW',
        link: '/pages/users/add',
      },
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/users/list',
      },
    ],
  },
  {
    title: 'MENU.PROFILES',
    icon: 'flag-outline',
    children: [
      {
        title: 'MENU.ADD_NEW',
        link: '/pages/profiles/add',
      },
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/profiles/list',
      },
    ],
  },
  {
    title: 'MENU.RIDES',
    icon: 'flag-outline',
    children: [
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/rides/list',
      },
    ],
  },
  {
    title: 'MENU.TRANSACTIONS',
    icon: 'layers-outline',
    children: [
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/transactions/list',
      },
      {
        title: 'MENU.PAYOUTS',
        link: '/pages/transactions/payouts/list',
      }
    ],
  },
  {
    title: 'MENU.PAYMENT_METHODS',
    icon: 'credit-card-outline',
    children: [
      {
        title: 'MENU.ADD_NEW',
        link: '/pages/paymentmethods/add',
      },
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/paymentmethods/list',
      },
    ],
  },
  {
    title: 'MENU.FAQS',
    icon: 'question-mark-circle-outline',
    children: [
      {
        title: 'MENU.ADD_NEW',
        link: '/pages/faqs/add',
      },
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/faqs/list',
      },
    ],
  },
  {
    title: 'MENU.SUPPORT',
    icon: 'phone-call-outline',
    children: [
      {
        title: 'MENU.VIEW_ALL',
        link: '/pages/supports/list',
      },
    ],
  },
  {
    title: 'MENU.SETTINGS',
    icon: 'settings-outline',
    children: [
      {
        title: 'MENU.APPLICATION',
        link: '/pages/settings/edit',
      },
      {
        title: 'MENU.SYSTEM',
        link: '/pages/settings/system',
      }
    ],
  },
];
