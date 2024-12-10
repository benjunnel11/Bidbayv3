import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsGraphUp } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Sales.css';

function Sales() {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                // Reference the userSeller document using the user's UID
                const userDoc = doc(firestore, 'userSeller', user.uid);
                const userSnap = await getDoc(userDoc);

                if (userSnap.exists()) {
                    const salesHistory = userSnap.data().salesHistory || [];
                    setSalesData(salesHistory);
                } else {
                    console.warn("No user data found for this user in userSeller collection.");
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    return (
        <main className="main-container">
            <div className="main-title">
                <h3>Sales/Analytics</h3>
            </div>
            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <h3>Products</h3>
                        <BsFillArchiveFill className="card-icon" />
                    </div>
                    <h1>100</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Sales</h3>
                        <BsGraphUp className="card-icon" />
                    </div>
                    <h1>{salesData.length}</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>Profit</h3>
                        <FaDollarSign className="card-icon" />
                    </div>
                    <h1>${
                        salesData.reduce((total, sale) => total + parseFloat(sale.amount || 0), 0).toFixed(2)
                    }</h1>
                </div>
            </div>
            <div className="salesHistory-container">
                <div className="sales-history-section">
                    <h3>Sales History</h3>
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item Name</th>
                                <th>Sale Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData.map((sale) => (
                                <tr key={sale.id}>
                                    <td>{sale.id}</td>
                                    <td>{sale.itemName}</td>
                                    <td>{sale.saleDate}</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>
                                        ${parseFloat(sale.amount).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Sales;
