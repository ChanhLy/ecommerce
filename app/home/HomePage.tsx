import { Outlet } from "@remix-run/react";
import { Button } from "~/components/ui/Button";

export default function HomePage() {
  return <div>
    <Button>home</Button>
    <Outlet />
  </div>
};
