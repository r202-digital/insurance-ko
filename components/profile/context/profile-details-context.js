import { createContainer } from "unstated-next";
import { useState } from "react";
import { initialProfileDetails } from "lib/constant";

function useProfileDetails(initialState = initialProfileDetails) {
  const [contextProfileDetails, updateProfileDetails] = useState(initialState);
  const setContextProfileDetails = (data) => updateProfileDetails(data);
  const setEmail = (data) =>
    updateProfileDetails({ ...contextProfileDetails, email: data });
  const setFirstName = (data) =>
    updateProfileDetails({ ...contextProfileDetails, firstName: data });
  const setLastName = (data) =>
    updateProfileDetails({ ...contextProfileDetails, lastName: data });
  const setMiddleName = (data) =>
    updateProfileDetails({ ...contextProfileDetails, middleName: data });
  const setSuffix = (data) =>
    updateProfileDetails({ ...contextProfileDetails, suffix: data });
  const setGender = (data) =>
    updateProfileDetails({ ...contextProfileDetails, gender: data });
  const setMaritalStatus = (data) =>
    updateProfileDetails({ ...contextProfileDetails, maritalStatus: data });
  const setBirthDate = (data) =>
    updateProfileDetails({ ...contextProfileDetails, birthDate: data });
  const setFirstAddress = (data) =>
    updateProfileDetails({ ...contextProfileDetails, firstAddress: data });
  const setSecondAddress = (data) =>
    updateProfileDetails({ ...contextProfileDetails, secondAddress: data });
  const setCity = (data) =>
    updateProfileDetails({ ...contextProfileDetails, city: data });
  const setProvince = (data) =>
    updateProfileDetails({ ...contextProfileDetails, province: data });
  const setPostalCode = (data) =>
    updateProfileDetails({ ...contextProfileDetails, postalCode: data });
  const setCountry = (data) =>
    updateProfileDetails({ ...contextProfileDetails, country: data });
  const setMobilePhone = (data) =>
    updateProfileDetails({ ...contextProfileDetails, mobilePhone: data });
  return {
    contextProfileDetails,
    setContextProfileDetails,
    setEmail,
    setFirstName,
    setLastName,
    setMiddleName,
    setSuffix,
    setGender,
    setMaritalStatus,
    setBirthDate,
    setFirstAddress,
    setSecondAddress,
    setCity,
    setProvince,
    setPostalCode,
    setCountry,
    setMobilePhone,
  };
}

const ProfileDetailsContext = createContainer(useProfileDetails);

export default ProfileDetailsContext;
