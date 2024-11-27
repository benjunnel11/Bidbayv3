import React, { useState, useEffect } from 'react';
import { auth, firestore} from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Wallet.css';

const Wallet = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showWithdrawDetailsModal, setShowWithdrawDetailsModal] = useState(false);
    const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState('');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    const [userName, setUserName] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [balance, setBalance] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionHistory, setTransactionHistory] = useState([]);
    
    const [userData, setUserData] = useState({
        name: '',
        profilePicture: '',
        balance: 0
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            fetchUserProfile(user.uid); // Fetch user profile
          }
        });
    
        return () => unsubscribe(); // Clean up the listener on unmount
      }, []);
    
      const fetchUserProfile = async (uid) => {
        try {
            const userDoc = doc(firestore, 'userBidder' || 'userSeller', uid);
            const userSnap = await getDoc(userDoc);
    
            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserName(data.firstName);
                setUserData({
                    name: data.firstName,
                    profilePicture: data.profilePicture,
                    balance: data.balance || 0
                });
                setProfilePictureURL(data.profilePicture);
                setTransactionHistory(data.transactionHistory || []);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    

    const handleDeposit = () => {
        setShowPaymentModal(true);
    };

    

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
        setShowPaymentModal(false);
        setShowDetailsModal(true);
    };

    const handleConfirm = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const userDoc = doc(firestore, 'userBidder' || 'userSeller', user.uid);
                const userSnap = await getDoc(userDoc);
                
                if (userSnap.exists()) {
                    const currentBalance = userSnap.data().balance || 0;
                    const newBalance = currentBalance + Number(amount);
                    
                    await setDoc(userDoc, {
                        balance: newBalance
                    }, { merge: true });
                    
                    // Update both state variables
                    setBalance(newBalance);
                    setUserData(prev => ({
                        ...prev,
                        balance: newBalance
                    }));

                    const newTransaction = {
                        mode: 'Deposit',
                        wallet: selectedPayment,
                        refID: generateRefID(),
                        number: phoneNumber,
                        amount: Number(amount),
                        date: new Date().toLocaleString(),
                    };
                    updateTransactionHistory(newTransaction);
                }
                
                setShowDetailsModal(false);
                setPhoneNumber('');
                setAmount('');
                
            } catch (error) {
                console.error("Error updating balance:", error);
            }
        }
    };
    
    
    
    const handleWithdraw = () => {
      setShowWithdrawModal(true);
    };

    const handleWithdrawMethodSelect = (method) => {
      setSelectedWithdrawMethod(method);
      setShowWithdrawModal(false);
      setShowWithdrawDetailsModal(true);
    };
    
const handleWithdrawConfirm = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            const userDoc = doc(firestore, 'userBidder' || 'userSeller', user.uid);
            const userSnap = await getDoc(userDoc);
            
            if (userSnap.exists()) {
                const currentBalance = userSnap.data().balance || 0;
                const withdrawAmount = Number(amount);
                
                // Check if user has sufficient balance
                if (currentBalance >= withdrawAmount) {
                    const newBalance = currentBalance - withdrawAmount;
                    
                    await setDoc(userDoc, {
                        balance: newBalance
                    }, { merge: true });

                    // Update both state variables
                    setBalance(newBalance);
                    setUserData(prev => ({
                        ...prev,
                        balance: newBalance
                    }));

                    const newTransaction = {
                        mode: 'Withdraw',
                        wallet: selectedWithdrawMethod,
                        refID: generateRefID(),
                        number: phoneNumber,
                        amount: Number(amount),
                        date: new Date().toLocaleString(),
                    };
                    updateTransactionHistory(newTransaction);
                    
                    setShowWithdrawDetailsModal(false);
                    setPhoneNumber('');
                    setAmount('');
                } else {
                    alert('Insufficient balance');
                }
            }
        } catch (error) {
            console.error("Error updating balance:", error);
        }
    }
};
    

const generateRefID = () => {
    return Math.random().toString(36).substr(2, 9);
};

const updateTransactionHistory = async (transaction) => {
    const user = auth.currentUser;
    if (user) {
        try {
            const userDoc = doc(firestore, 'userBidder' || 'userSeller', user.uid);
            const userSnap = await getDoc(userDoc);
            let currentHistory = [];

            if (userSnap.exists()) {
                currentHistory = userSnap.data().transactionHistory || [];
            }

            const updatedHistory = [...currentHistory, transaction];

            await setDoc(userDoc, { transactionHistory: updatedHistory }, { merge: true });

            setTransactionHistory(updatedHistory);
            console.log('Transaction Added:', transaction);
        } catch (error) {
            console.error("Error updating transaction history:", error);
        }
    }
};

    return (
        <div className="wallet-container">
            <div className="wallet-card">
                <div className="top-section">
                    <div className="profile-info">
                        <div className="profile-image-container">
                            <img src={profilePictureURL || 'default-avatar.png'} alt="Profile" />
                        </div>
                        <h2>{userName}</h2>
                    </div>
                    
                    <div className="balance-info">
                        <span className="balance-label">Current Balance</span>
                        <h1 className="balance-amount">${userData.balance.toFixed(2)}</h1>
                    </div>
                    
                    <div className="action-buttons">
                        <button className="btn-deposit" onClick={handleDeposit}>Deposit</button>
                        <button className="btn-withdraw" onClick={handleWithdraw}>Withdraw</button>
                    </div>  
                </div>

                {showPaymentModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Select Payment Method</h2>
                            <div className="payment-buttons">
                                <button onClick={() => handlePaymentSelect('GCash')}>GCash</button>
                                <button onClick={() => handlePaymentSelect('PayPal')}>PayPal</button>
                            </div>
                            <button className="close-button" onClick={() => setShowPaymentModal(false)}>×</button>
                        </div>
                    </div>
                )}

                {showDetailsModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{selectedPayment} Payment Details</h2>
                            <div className="payment-form">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <button className="confirm-button" onClick={handleConfirm}>
                                    Confirm Payment
                                </button>
                            </div>
                            <button className="close-button" onClick={() => setShowDetailsModal(false)}>×</button>
                        </div>
                    </div>
                )}

                <div className="transaction-section">
                    <h3>Transaction History</h3>
                    <div className="transaction-list">
                        {transactionHistory.map((txn, index) => (
                            <div key={index} className="transaction-item">
                                <span>{txn.mode} via {txn.wallet}</span>
                                <span>RefID: {txn.refID}</span>
                                <span>{txn.date}</span>
                                <span style={{ color: txn.mode === 'Deposit' ? 'green' : 'red' }}>
                                    Amount: {txn.mode === 'Deposit' ? (
                                            <span style={{ color: 'green', fontWeight: 'bold' }}>+ </span>
                                        ) : (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>- </span>
                                        )}
                                        ${txn.amount.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showWithdrawModal && (
              <div className="modal-overlay">
                  <div className="modal-content">
                      <h2>Select Withdrawal Method</h2>
                      <div className="payment-buttons">
                          <button onClick={() => handleWithdrawMethodSelect('GCash')}>GCash</button>
                          <button onClick={() => handleWithdrawMethodSelect('PayPal')}>PayPal</button>
                      </div>
                      <button className="close-button" onClick={() => setShowWithdrawModal(false)}>×</button>
                  </div>
              </div>
          )}

          {showWithdrawDetailsModal && (
              <div className="modal-overlay">
                  <div className="modal-content">
                      <h2>{selectedWithdrawMethod} Withdrawal Details</h2>
                      <div className="payment-form">
                          <input
                              type="text"
                              placeholder="Phone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          <input
                              type="number"
                              placeholder="Amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                          />
                          <button className="confirm-button" onClick={handleWithdrawConfirm}>
                              Confirm Withdrawal
                          </button>
                      </div>
                      <button className="close-button" onClick={() => setShowWithdrawDetailsModal(false)}>×</button>
                  </div>
              </div>
          )}
        </div>
    );
};

export default Wallet;
