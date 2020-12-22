import React from "react";

import { auth } from "../../firebase";

const SignOutButton = () => <span onClick={auth.doSignOut}>Sign Out</span>;

export default SignOutButton;
