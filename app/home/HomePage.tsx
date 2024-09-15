import { Outlet } from "@remix-run/react";

export default function HomePage() {
  return <div>
    home
    <Outlet />
  </div>
};
