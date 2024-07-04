import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../components/UpdateModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(props.title);
  const [company, setCompany] = useState(props.company);
  const [name, setName] = useState(props.name);
  const [address, setAddress] = useState(props.address);
  const [notes, setNotes] = useState(props.notes);
  const [date, setDate] = useState(
    props.date
      ? new Date(props.date).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );

  const { mutate: callUpdateAppts } = useMutation({
    mutationFn: async () =>
      await usingFetch("/api/appts/" + props.id, "PATCH", {
        title,
        name,
        company,
        address,
        notes,
        date,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["appts"]);
      props.setShowUpdateModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <button
            className="fa-solid fa-x"
            onClick={() => props.setShowUpdateModal(false)}
          ></button>
        </div>
        <h2>
          Appointment <span className={styles.bold}>update?</span>
        </h2>
        <input
          className={styles.inputBox}
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className={styles.inputBox}
          type="text"
          value={company}
          placeholder="Company (Optional)"
          onChange={(event) => setCompany(event.target.value)}
        />

        <input
          className={styles.inputBox}
          type="text"
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className={styles.inputBox}
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <input
          className={styles.inputBox}
          type="text"
          value={address}
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />

        <input
          className={styles.inputBox}
          type="text"
          value={notes}
          placeholder="Additional notes (Optional)"
          onChange={(event) => setNotes(event.target.value)}
        />
        <button className={styles.submit} onClick={callUpdateAppts}>
          Update
        </button>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          id={props.id}
          title={props.title}
          company={props.company}
          name={props.name}
          address={props.address}
          date={props.date}
          status={props.status}
          notes={props.notes}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default UpdateModal;
