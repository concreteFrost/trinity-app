function isErrorStatus(res) {
  const status = res.status;

  if (status >= 400) {
    console.log("status", status);
  }

  return status >= 400;
}

export default isErrorStatus;
