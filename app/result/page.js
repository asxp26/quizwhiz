"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStripe } from "@/utils/get-stripe";
import { useSearchParams } from "next/navigation";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionId) return;
      try {
        const response = await fetch(`/api/checkout_sessions/${sessionId}`);
        const data = await response.json();
        if (response.ok) {
          setSession(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("An error occurred while fetching the checkout session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [sessionId]);

  if (loading) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
      {session.payment_status === "paid" ? (
        <Box>
          <Typography variant="h6">Payment successful!</Typography>
          <Box sx={{ mt: 22 }}>
            <Typography variant="h6">Session ID: {session.id}</Typography>
            <Typography variant="h6">Amount: {session.amount}</Typography>
            <Typography variant="h6">Currency: {session.currency}</Typography>
            <Typography variant="h6">
              Payment Method: {session.payment_method}
            </Typography>
            <Typography variant="h6">
              Payment Status: {session.payment_status}
            </Typography>
            <Typography variant="h6">
              Payment Date: {session.payment_date}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">Payment failed...</Typography>
      )}
    </Container>
  );
};
