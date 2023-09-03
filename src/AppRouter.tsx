import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";

import MarketingContianer from "containers/Marketing";
import FinanceContainer from 'containers/Finance'
import PersonnelContainer from 'containers/Personnel'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<MarketingContianer/>),
  },
  {
    path: "/marketing",
    element: (<MarketingContianer/>),
  },
  {
    path: "/finance",
    element: (<FinanceContainer/>),
  },
  {
    path: "/personnel",
    element: (<PersonnelContainer/>),
  },
]);

export default router;