import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/homepage';
import LiveManagement from './AdminComponents/LiveManagement/LiveAdmin';
import BidderPage from './Bidderpage/BidderRegistration/bidderregistration';
import LoginPage from './LogIn/login';
import SellerRegistrationPage from './Sellerpage/SellerRegistration/sellerregistration';
import SellerRegistrationPage2 from './Sellerpage/SellerRegistration/sellerregistration2';
import BidderRegistrationPage from './Bidderpage/BidderRegistration/bidderregistration';
import BidderRegistrationPage2 from './Bidderpage/BidderRegistration/bidderregistration2';
import SellerHomePage from './Sellerpage/sellerhomepage/sellerhomepage';
import BidderHomePage from './Bidderpage/bidderhomepage/bidderhomepage';
import BiddingManagement from './BiddingManagement/biddingmanagement';
import ProfileManagement from './ProfileManagement/profilemanagement';
import SellerWallet from './E-WalletManagement/Seller/Wallet';
import BidderWallet from './E-WalletManagement/Bidder/bidderWallet';
import AboutUs from './About/aboutUs';
import Contacts from './Contact/Contacts';
import Sales from './SalesManagement/Sales';
import WatchLive from './WatchLive/watchlive';
import './App.css';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route path='/admin/*' element={<MainAdminContent/>}/>
          <Route path='/bidderlogin' element={<BidderPage/>}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sellerregistration' element={<SellerRegistrationPage/>}/>
          <Route path='/sellerregistration2' element={<SellerRegistrationPage2/>}/>
          <Route path='/bidderregistration' element={<BidderRegistrationPage/>}/>
          <Route path='/bidderregistration2' element={<BidderRegistrationPage2/>}/>
          <Route path='/sellerhomepage' element={<SellerHomePage/>}/>
          <Route path='/bidderhomepage' element={<BidderHomePage/>}/>
          <Route path='/biddingmanagement' element={<BiddingManagement/>}/> 
          <Route path='/profilemanagement' element={<ProfileManagement/>}/>
          <Route path='*' element={<Homepage/>}/>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/watchlive" element={<WatchLive />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

const MainAdminContent = () => {
  return (
        <Routes>
          <Route exact path='/' element={<Homepage/>}/>
          <Route path="livemanagement" element={<LiveManagement />} />
          <Route path="seller-wallet" element={<SellerWallet/>} />          <Route path="seller-wallet" element={<SellerWallet/>} />
          <Route path="bidder-wallet" element={<BidderWallet/>} />
          <Route path="sales" element={<Sales/>} />
        </Routes>
  );
}

export default App;