import React, { useEffect, useState } from "react";

// material-ui
import { Typography } from "@material-ui/core";

// project imports
import ProfileLayout from "../ProfileLayout";
import AdminList from "./AdminList";
import ProductsContext from "./product-context";

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const AdminLayout = () => {
  return (
    <ProfileLayout>
      <ProductsContext.Provider>
        <AdminList />
      </ProductsContext.Provider>
    </ProfileLayout>
  );
};

export default AdminLayout;
