import React, { useEffect, useState } from "react";
import styles from "../components/ApptCard.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UpdateModal from "./UpdateModal";

const ApptCard = (props) => {
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US');
  };

  const formatTime = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch("/api/appts/" + props.id, "DELETE", undefined),
    onSuccess: () => {
      queryClient.invalidateQueries(["appts"]);
    },
  });

  useEffect(() => {
    const checkStatus = () => {
      const appointmentDate = new Date(props.date);
      const now = new Date();
      if (appointmentDate < now) {
        setIsCompleted(true);
      }
    };
    checkStatus();
  }, [props.date]);
  

  return (
    <>
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          title={props.title}
          company={props.company}
          name={props.name}
          address={props.address}
          date={props.date}
          status={props.status}
          notes={props.notes}
          setShowUpdateModal={setShowUpdateModal}
          formatDate={formatDate}
        />
      )}
      <div className={`${styles.card} ${isCompleted ? styles.completed : ''}`}>
        <div className={styles.btns}>
          <button
            className="fa-solid fa-pen-to-square"
            onClick={() => setShowUpdateModal(true)}
          ></button>
          <button className="fa-solid fa-x" onClick={mutate}></button>
        </div>

        <h3>{props.title}</h3>
        <hr />
        {props.company && <p>Company: {props.company}</p>}
        
        <p>With: {props.name}</p>
        <p>Date: {formatDate(props.date)}</p>
        <p>Time: {formatTime(props.date)}</p>
        <p>Address: {props.address}</p>
        {props.notes && <p>Notes: {props.notes}</p>}
      </div>
    </>
  );
};

export default ApptCard;
