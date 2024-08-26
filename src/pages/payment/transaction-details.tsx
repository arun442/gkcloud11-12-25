import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from "@/components/helpers/header";
import Footer from "@/components/helpers/footer";
import Marquee from "@/components/helpers/Marquee";
import CookieConsent from "@/components/helpers/cookie";
import styles from '../../styles/TransactionDetails.module.css'; 

interface TransactionDetails {
  order_id: string;
  tracking_id: string;
  order_status: string;
  payment_mode: string;
  card_name: string;
  status_message: string;
  amount: string;
  billing_name: string;
}

const PaymentStatus: React.FC = () => {
  const router = useRouter();
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [courseUrl, setCourseUrl] = useState<string>(''); // State for the course URL

  useEffect(() => {
    if (router.query.data) {
      const details: TransactionDetails = JSON.parse(
        decodeURIComponent(router.query.data as string)
      ).transactionDetails;
      setTransactionDetails(details);
    }
    if (router.query.courseUrl) {
      setCourseUrl(decodeURIComponent(router.query.courseUrl as string)); // Get course URL from query
    }
  }, [router.query.data, router.query.courseUrl]);

  const handleGoToCourse = () => {
    if (courseUrl) {
      window.location.href = courseUrl; // Redirect to course URL
    }
  };

  if (!transactionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Payment Transaction Details</title>
        <meta name="description" content="View details of your payment transaction." />
      </Head>
      <Header />
      <Marquee />
      <main className={styles.main}>
        <h1 className={styles.title}>Payment Transaction Details</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.tableCell}>Order ID</td>
                <td className={styles.tableCell}>{transactionDetails.order_id}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Tracking ID</td>
                <td className={styles.tableCell}>{transactionDetails.tracking_id}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Order Status</td>
                <td className={styles.tableCell}>{transactionDetails.order_status}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Payment Mode</td>
                <td className={styles.tableCell}>{transactionDetails.payment_mode || '-'}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Card Name</td>
                <td className={styles.tableCell}>{transactionDetails.card_name || '-'}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Status Message</td>
                <td className={styles.tableCell}>{transactionDetails.status_message}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Amount</td>
                <td className={styles.tableCell}>{transactionDetails.amount}</td>
              </tr>
              <tr>
                <td className={styles.tableCell}>Billing Name</td>
                <td className={styles.tableCell}>{transactionDetails.billing_name}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {courseUrl && (
          <button onClick={handleGoToCourse} className={styles.returnButton}>
            Ok
          </button>
        )}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
};

export default PaymentStatus;
