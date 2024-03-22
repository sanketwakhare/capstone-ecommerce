import "./App.css";

function App() {
  const loadScript = async () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const verifyPaymentSignature = async (paymentDetails) => {
    const { orderId, paymentId, signature } = paymentDetails;
    const response = await fetch(
      "http://localhost:3000/api/payments/verify-payment-signature",
      {
        method: "POST",
        body: JSON.stringify({
          orderId,
          paymentId,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-razorpay-signature": signature,
        },
      }
    );
    const data = await response.json();
    console.log(data.message);
  };

  const capturePaymentTransaction = async (paymentDetails) => {
    const {
      orderId,
      txnOrderId,
      txnPaymentId,
      txnPaymentStatus,
      txnPaymentCompletedAt,
      totalAmount,
      currency,
    } = paymentDetails;
    const response = await fetch(
      "http://localhost:3000/api/payments/capture-payment-transaction",
      {
        method: "POST",
        body: JSON.stringify({
          orderId,
          txnOrderId,
          txnPaymentId,
          txnPaymentStatus,
          txnPaymentCompletedAt,
          totalAmount,
          currency,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.message);
  };

  const makePayment = async (orderData) => {
    const { orderId, amount, currency } = orderData;
    const { REACT_APP_RAZORPAY_PUBLIC_KEY } = process.env;

    const options = {
      key: REACT_APP_RAZORPAY_PUBLIC_KEY,
      amount: amount.toString(),
      currency: currency,
      name: "My Business Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        // verify payment signature
        await verifyPaymentSignature({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        // capture payment transaction
        await capturePaymentTransaction({
          // orderId here is id from database
          orderId: "65e19a3453716807884b8cba",
          txnOrderId: response.razorpay_order_id,
          txnPaymentId: response.razorpay_payment_id,
          txnPaymentStatus: "paid",
          txnPaymentCompletedAt: new Date(),
          totalAmount: amount,
          currency: currency,
        });
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Sanket Wakhare", //your customer's name
        email: "sanketwakhare@gmail.com",
        contact: "9730511748", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#6822CC",
      },
    };

    const rzpInstance = new window.Razorpay(options);
    rzpInstance.open();
  };

  const handlePayNow = async () => {
    // load checkout.js script
    await loadScript();

    const payload = {
      amount: 500,
      currency: "INR",
    };
    // create txn payment order(checkout api)
    const resp = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const orderData = await resp.json();
    // make payment
    await makePayment(orderData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handlePayNow}>Pay Now</button>
      </header>
    </div>
  );
}

export default App;
