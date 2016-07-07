import React from 'react'
import { browserHistory } from 'react-router'
import { Router, Route } from 'react-router'

const root = { documentRoot: '/admin' };

// components
import Count        from './components/Count'

// layouts
import NoMatch      from './layouts/NoMatch'

// layouts/admin
import Admin        from './layouts/admin/Admin'
import AdminHeader  from './layouts/admin/Header'
import AdminNav     from './layouts/admin/Nav'

// pages/admin
import AdminHome        from './pages/admin/Home'

import VehiclesIndex    from './pages/admin/vehicles/Index'
import VehiclesEdit     from './pages/admin/vehicles/Edit'

import PartsIndex       from './pages/admin/parts/Index'
import PartsEdit        from './pages/admin/parts/Edit'

import ContainersIndex  from './pages/admin/containers/Index'
import ContainersEdit   from './pages/admin/containers/Edit'

import MountingsIndex   from './pages/admin/mountings/Index'
import MountingsEdit    from './pages/admin/mountings/Edit'

import AdminParts       from './pages/admin/Parts'
import AdminContainers  from './pages/admin/Containers'
import AdminMountings   from './pages/admin/Mountings'


const routes = (
  <Router history={browserHistory}>

    <Route
      global={root}
      component={Admin}
      >
      <Route path={root.documentRoot + '/'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: AdminHome
        }} />

      <Route path={root.documentRoot + '/vehicles/edit/:id'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: VehiclesEdit
        }} />

      <Route path={root.documentRoot + '/vehicles'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: VehiclesIndex
        }} />

      <Route path={root.documentRoot + '/parts/edit/:id'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: PartsEdit
        }} />

      <Route path={root.documentRoot + '/parts'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: PartsIndex
        }} />

      <Route path={root.documentRoot + '/containers/edit/:id'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: ContainersEdit
        }} />

      <Route path={root.documentRoot + '/containers'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: ContainersIndex
        }} />

      <Route path={root.documentRoot + '/mountings/edit/:id'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: MountingsEdit
        }} />

      <Route path={root.documentRoot + '/mountings'}
        global={root}
        components={{
          header: AdminHeader,
          nav: AdminNav,
          main: MountingsIndex
        }} />

    </Route>

    <Route path="*" components={NoMatch} global={root} />
  </Router>
);

module.exports = routes;
