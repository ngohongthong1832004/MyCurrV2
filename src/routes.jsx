import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Courses, Curriculums } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Curriculums",
        path: "/curriculums",
        element: <Curriculums />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Courses",
        path: "/Courses",
        element: <Courses />,
      },
    ],
  },
  {
    title: "curriculums CRUD pages",
    layout: "curriculums",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "deleteCurriculums",
        path: "/delete",
        element: <SignIn />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
