import safepay from "@sfpy/checkout-components";
import React from "react";
import ReactDOM from "react-dom";

const SafepayButtonInstance = safepay.Button.driver("react", {
React: React,
ReactDOM: ReactDOM,
});

export default SafepayButtonInstance;
        