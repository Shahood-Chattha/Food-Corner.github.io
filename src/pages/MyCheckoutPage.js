
import SafepayButtonInstance from "../components/common/SafePayButton"

const MyCheckoutPage = ({ orderId }) => (
    <div>
        <p>Checkout for order id {orderId}</p>
        <SafepayButtonInstance
            env={'sandbox'}
            client={{
            'sandbox': 'sec_733defcf-835f-4cd1-99fd-b3e62dd83fe0'
            }}
            style={{
              mode: 'light',
              size: 'medium',
              variant: 'primary'
            }}
            orderId={"12344"}
            payment={{
              "currency": "PKR",
              "amount": 1000,
            }}
            onPayment={(data) => {
            // At this point your customer has approved the payment
            // and you can show a success message or make an API request
            // to your servers to add the data.
            return fetch("/api/orders/mark-paid", {
                method: "post",
            })
            }}
            onCancel={() => {
            console.log('payment cancelled')
            }}
        />
    </div>
)

export default MyCheckoutPage ;
        