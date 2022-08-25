import React from "react";

export default function UserProfilePage(props) {
  return (
    <>
      <h1>{props.username}</h1>
    </>
  );
}

// Only executes with a request to this page
export async function getServerSideProps(context) {
  return {
    props: {
      username: "Diego",
    },
  };
}
