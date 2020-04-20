import React from 'react';
import { Router, Redirect } from "@reach/router";
import Dashboard from '../pages/Dashboard';
import Notebook from '../pages/Notebook';
import { AuthLayout } from '../components/Layouts';

const Authenticated = () => (
  <Router>
    <AuthLayout path="/">
      <Dashboard path="/" />
      <Notebook path="notebook/:notebookId" />
      <Redirect from="*" to="/" noThrow />
    </AuthLayout>
  </Router>
)

export default Authenticated;