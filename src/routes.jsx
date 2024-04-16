import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  DocumentTextIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Courses, Curriculums, Teacher } from "@/pages/dashboard";
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
        icon: <UsersIcon {...icon} />,
        name: "Teacher",
        path: "/teacher",
        element: <Teacher />,
      },
      {
        icon: <DocumentDuplicateIcon {...icon} />,
        name: "Curriculums",
        path: "/curriculums",
        element: <Curriculums />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Courses",
        path: "/Courses",
        element: <Courses />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
