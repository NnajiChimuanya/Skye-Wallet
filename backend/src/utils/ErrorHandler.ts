export const handleError = (err: any) => {
  let error = { error: "An error occured" };

  if (err.code === 11000) {
    error = {
      error: "Email already exists",
    };
  }

  if (err.message.includes("name required")) {
    error = {
      error: "please enter Name",
    };
  }

  if (err.message.includes("Email required")) {
    error = {
      error: "please enter Email",
    };
  }

  if (err.message.includes("Phone number required")) {
    error = {
      error: "please enter Phone number",
    };
  }

  if (err.message.includes("Password required")) {
    error = {
      error: "please enter Password",
    };
  }

  return error;
};
