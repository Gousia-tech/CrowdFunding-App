import React from "react";
import { Routes, Route } from "react-router-dom";


import OrphanageHomePage from "./Landing-Page/OrphanageHomePage";
import Donations from "./Donation/Donations";
import MyDonations from "./Donation/Mydonations";
import DonationsReceived from "./Donation/DonationsRecived";
import HomePage from "./Landing-Page/HomePage";
import DonorRegister from "./Authentication/DonorRegistration";
import DonorLogin from "./Authentication/DonorLogin";
import ProfilePage from "./Landing-Page/Profile";
import OrgLoginForm from "./Authentication/OrganisationLogin";
import OrgRegisterForm from "./Authentication/OrganisationRegistration";
import OrganisationProfile from "./Landing-Page/OrgProfile";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
  
      <Route path="/orphanage-home" element={<OrphanageHomePage />} />
      <Route path="/donate" element={<Donations />} />
      <Route path="/my-donations" element={<MyDonations />} />
      <Route path="/donations-recived" element={<DonationsReceived />} />
      <Route path="/register/donor" element={<DonorRegister/>}/>
      <Route path="/login/donor" element={<DonorLogin/>}/>
      <Route path="/login/organisation" element={<OrgLoginForm/>}/>
      <Route path= "/register/organisation" element={<OrgRegisterForm/>}/>

     <Route path="/org/profile" element={<OrganisationProfile/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>

    </Routes>
  );
};

export default Routing;
