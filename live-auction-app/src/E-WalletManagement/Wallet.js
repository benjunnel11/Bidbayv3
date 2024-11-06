import React, { useState } from 'react';
import './Wallet.css';

const Wallet = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showWithdrawDetailsModal, setShowWithdrawDetailsModal] = useState(false);
    const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleDeposit = () => {
        setShowPaymentModal(true);
    };

    

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
        setShowPaymentModal(false);
        setShowDetailsModal(true);
    };

    const handleConfirm = () => {
        console.log('Payment Details:', {
            method: selectedPayment,
            phoneNumber,
            amount
        });
        setShowDetailsModal(false);
        setPhoneNumber('');
        setAmount('');
    };
    
    const handleWithdraw = () => {
      setShowWithdrawModal(true);
    };

    const handleWithdrawMethodSelect = (method) => {
      setSelectedWithdrawMethod(method);
      setShowWithdrawModal(false);
      setShowWithdrawDetailsModal(true);
    };
    
    const handleWithdrawConfirm = () => {
      console.log('Withdraw Details:', {
        method: selectedWithdrawMethod,
        phoneNumber,
        amount
      });
      setShowWithdrawDetailsModal(false);
      setPhoneNumber('');
      setAmount('');
    };

    const transactions = [
        {
            id: 1,
            name: "Spotify Subscription",
            date: "28 Jan, 12:30 AM",
            amount: -2500
        },
        {
            id: 2,
            name: "Freepik Sales",
            date: "25 Jan, 10:40 PM",
            amount: 750
        },
        {
            id: 3,
            name: "Mobile Service",
            date: "20 Jan, 03:29 PM",
            amount: -150
        },
        {
            id: 4,
            name: "Wilson",
            date: "15 Jan, 03:29 PM",
            amount: -1050
        },
        {
            id: 5,
            name: "Emily",
            date: "14 Jan, 10:40 PM",
            amount: 840
        }
    ];

    return (
        <div className="wallet-container">
            <div className="wallet-card">
                <div className="top-section">
                    <div className="profile-info">
                        <div className="profile-image-container">
                            <img src="https://placehold.co/100x100" alt="John Cena" />
                        </div>
                        <h2>John Cena</h2>
                    </div>
                    
                    <div className="balance-info">
                        <span className="balance-label">Current Balance</span>
                        <h1 className="balance-amount">$2,145.00</h1>
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
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-info">
                                    <span className="transaction-name">{transaction.name}</span>
                                    <span className="transaction-date">{transaction.date}</span>
                                </div>
                                <span className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                                    {transaction.amount > 0 ? `+${transaction.amount}` : `-${Math.abs(transaction.amount)}`}
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
