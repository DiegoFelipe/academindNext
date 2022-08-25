import React from "react";

export default function UserProfilePage(props) {
  return (
    <>
      <h1>{props.username}</h1>
    </>
  );
}

// Only executes with a request to this page
// context has access to the full request
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  return {
    props: {
      username: "Diego",
    },
  };
}
