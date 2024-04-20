// components/payments/transaction-details-component.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TransactionDetailsPage = () => {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extract query parameter from URL
    const { transactionDetails: encodedTransactionDetails } = router.query;

    if (encodedTransactionDetails) {
      // Decode and parse transaction details
      const decodedTransactionDetails = decodeURIComponent(encodedTransactionDetails);
      const parsedTransactionDetails = JSON.parse(decodedTransactionDetails);
      
      // Set transaction details to state
      setTransactionDetails(parsedTransactionDetails);
    }
  }, [router.query]);

  return (
    <div>
      <h1>Transaction Details</h1>
      {transactionDetails && (
        <table>
          <tbody>
            <tr>
              <td>Order ID:</td>
              <td>{transactionDetails.order_id}</td>
            </tr>
            <tr>
              <td>Tracking ID:</td>
              <td>{transactionDetails.tracking_id}</td>
            </tr>
            <tr>
              <td>Order Status:</td>
              <td>{transactionDetails.order_status}</td>
            </tr>
            {/* Add more rows for other transaction details */}
            <tr>
              <td>Billing Name:</td>
              <td>{transactionDetails.billing_name}</td>
            </tr>
            <tr>
              <td>Billing Email:</td>
              <td>{transactionDetails.billing_email}</td>
            </tr>
            <tr>
              <td>Transaction Date:</td>
              <td>{transactionDetails.trans_date}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionDetailsPage;
