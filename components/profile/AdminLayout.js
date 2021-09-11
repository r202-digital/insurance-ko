import React, { useEffect, useState } from "react";

// material-ui
import { Typography } from "@material-ui/core";

// project imports
import ProfileLayout from "./ProfileLayout";
import MainCard from "components/cards/MainCard";
import AdminList from "./admin/AdminList";

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const AdminLayout = () => {
  return (
    <ProfileLayout>
      <AdminList />
    </ProfileLayout>
  );
};

export default AdminLayout;
