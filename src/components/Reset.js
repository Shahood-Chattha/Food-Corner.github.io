import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { auth, sendPasswordReset } from "../firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);
  return (
    <div className="container d-flex flex-column" style={{ height: "calc(100vh - 98px)"}}>
      <div className="row d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Reset Password</h3>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="mb-3 d-flex flex-grow-1 justify-content-center">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => sendPasswordReset(email)}
                  >
                    Send password reset email
                  </button>
                </div>
                <div className="text-center mt-3">
                  Don't have an account? <Link to="/register">Register</Link> now.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
