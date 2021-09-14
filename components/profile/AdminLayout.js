import React, { useEffect, useState } from "react";

// material-ui
import { Typography } from "@material-ui/core";

// project imports
import ProfileLayout from "./ProfileLayout";
import AdminList from "./admin/AdminList";
import ProductsContext from "./admin/product-context";

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
