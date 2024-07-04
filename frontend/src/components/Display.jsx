import React, { useEffect, useState } from "react";
import styles from "../components/Display.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import ApptCard from "./ApptCard";

const Display = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState('');

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["appts"],
    queryFn: async () => await usingFetch("/api/appts", undefined, undefined),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mutation = useMutation({
    mutationFn: async () =>
      await usingFetch("/api/appts", "PUT", {
        title,
        name,
        company,
        address,
        notes,
        date,
      }),
    onSuccess: () => {
      setTitle("");
      setCompany("");
      setName("");
      setAddress("");
      setNotes("");
      setDate('');
      queryClient.invalidateQueries(["appts"]);
    },
  });
  const formatDate = (date) => date.toLocaleDateString('en-GB');
  const formatTime = (date) => date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.introCard}>
          <p>{formatDate(currentTime)} {formatTime(currentTime)}</p>
          <h1>
            Hello, <span className={styles.bold}>Ash!</span>
          </h1>
          <img
            src="https://img.freepik.com/free-photo/landscape-with-nature-meadow-trees-sunset-generative-ai_188544-12881.jpg?t=st=1720017105~exp=1720020705~hmac=f0b262f7cd3a014ca68bebdcd28295495ce29ade48f0ec5bcb28c26cc0cdbb80&w=2000"
            alt=""
          />
        </div>
        <div className={styles.form}>
          <h2>
            Create <span className={styles.bold}>new plan?</span>
          </h2>
          <div>
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
            <button className={styles.submit} onClick={mutation.mutate}>
              Submit
            </button>
          </div>
        </div>
        <div className={styles.apptWindow}>
          <h2>
            Your <span className={styles.bold}>appointments.</span>
          </h2>
          {isSuccess &&
            data.map((item) => {
              return (
                <ApptCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  company={item.company}
                  name={item.name}
                  address={item.address}
                  date={item.date}
                  status={item.status}
                  notes={item.notes}
                />
              );
            })}
        </div>
      </div>

      {isFetching && <p>Loading...</p>}
      {isError && <div>{error.message}</div>}
    </>
  );
};

export default Display;
