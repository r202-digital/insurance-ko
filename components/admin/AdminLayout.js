import React from "react";
import AdminList from "./AdminList";
import ProductsContext from "./context/product-context";
// project imports
import ProfileLayout from "./ProfileLayout";

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
