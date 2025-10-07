"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Login = ({ className }) => {
  return (
    <Button className={className} onClick={() => signIn("google")}>
      ورود
    </Button>
  );
};

export default Login;
