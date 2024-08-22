import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from "@/components/helpers/header";
import Footer from "@/components/helpers/footer";
import Marquee from "@/components/helpers/Marquee";
import CookieConsent from "@/components/helpers/cookie";

interface TransactionDetails {
  order_id: string;
  tracking_id: string;
  order_status: string;
  currency: string;
  amount: string;
  trans_date: string;
  [key: string]: string | null;
}

const PaymentStatus: React.FC = () => {
  const router = useRouter();
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);

  useEffect(() => {
    if (router.query.data) {
      const details: TransactionDetails = JSON.parse(
        decodeURIComponent(router.query.data as string)
      ).transactionDetails;
      setTransactionDetails(details);
    }
  }, [router.query.data]);

  if (!transactionDetails) {
    return <div>Loading...</div>;
  }

  const filteredDetails = Object.entries(transactionDetails).filter(
    ([, value]) => value && value.trim() !== ""
  );

  const halfLength = Math.ceil(filteredDetails.length / 2);
  const leftColumn = filteredDetails.slice(0, halfLength);
  const rightColumn = filteredDetails.slice(halfLength);

  return (
    <>
      <Head>
        <title>Payment Transaction Details</title>
        <meta name="description" content="View details of your payment transaction." />
      </Head>
      <Header />
      <Marquee />
      <main style={{ padding: '20px' }}>
        <h1>Payment Transaction Details</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <table style={{ width: '48%', borderCollapse: 'collapse' }}>
            <tbody>
              {leftColumn.map(([key, value]) => (
                <tr key={key}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                    {key.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table style={{ width: '48%', borderCollapse: 'collapse' }}>
            <tbody>
              {rightColumn.map(([key, value]) => (
                <tr key={key}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                    {key.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
};

export default PaymentStatus;
