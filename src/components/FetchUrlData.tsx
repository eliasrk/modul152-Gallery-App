import type { QuerySnapshot } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

interface Props {
  url: string | { name: string };
}

const FetchUrlData = ({ url }: Props) => {
  const [license, setLicense] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const name = typeof url === "string" ? url : url?.name;
  useEffect(() => {
    async function getImageData(name: string) {
      const temp1 = name.slice(82);
      const temp = temp1.substring(0, temp1.indexOf("?"));
      const q = query(
        collection(db, "myCollection"),
        where("name", "==", temp)
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          setLicense(String(doc.data().licensing));
          setUserName(String(doc.data().username));
        });
      }
    }

    getImageData(name).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [url]);
  return (
    <>
      <div className="mt-2 mb-4 flex h-10 w-full flex-col rounded-lg text-center p-2">
        <h1>Licensing: {license}</h1>
        <h2>creator: {username}</h2>
      </div>
    </>
  );
};

export default FetchUrlData;
