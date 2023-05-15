import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChat } from "../features/chat/chatOperatorSlice";

const ChatDeleteModel = ({ chatId }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteChat(chatId));
    setShowConfirm(false);
  };

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="w-100 mx-2 btn btn-warning"
        onClick={() => setShowConfirm(true)}
      >
        Delete Chat
      </button>

      {/* Modal */}
      {showConfirm && (
        <div className="modal fade modal-dark show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h1 className="modal-title fs-5">
                  Confirmation for chat deletion
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this chat?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatDeleteModel;
