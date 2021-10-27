/*
import React from 'react'
import CIcon from '@coreui/icons-react'
*/

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'DynamoDB Data',
    to: '/dashboard'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Class',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'History',
        to: '/dynamodb/classhistory',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Performance History',
        to: '/base/cards',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Member',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Performance History',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Performance Class History',
        to: '/base/cards',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
]

export default _nav
