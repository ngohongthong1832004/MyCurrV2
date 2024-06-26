import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  DocumentTextIcon,
  UsersIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Courses, Curriculums, Teacher, CurriculumsEdit, CoursesEdit } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { 
  PATH_HOME,
  PATH_PROFILE,
  PATH_TEACHER,
  PATH_CURRICULUM,
  PATH_COURSE,
  PATH_EDIT_COURSE,
  PATH_EDIT_CURRICULUM,
  PATH_ADD_COURSE,
  PATH_ADD_CURRICULUM, 
  PATH_SIGN_UP,
} from '@/path'
import CoursesAdd from "./pages/dashboard/addCourse";
import CurriculumsAdd from "./pages/dashboard/addCurriculum";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    show: true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: PATH_HOME,
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: PATH_PROFILE,
        element: <Profile />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Teacher",
        path: PATH_TEACHER,
        element: <Teacher />,
      },
      {
        icon: <DocumentDuplicateIcon {...icon} />,
        name: "Curriculums",
        path: PATH_CURRICULUM,
        element: <Curriculums />,
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Courses",
        path: PATH_COURSE,
        element: <Courses />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    show: false,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "sign in",
        path: PATH_SIGN_UP,
        element: <SignIn />,
      },
    ],
  },
  {
    title: "option",
    layout: "dashboard",
    show: false,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "EditCurr",
        path:  PATH_EDIT_CURRICULUM + "/:id",
        element: <CurriculumsEdit />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "addCurriculum",
        path:   PATH_ADD_CURRICULUM,
        element: <CurriculumsAdd />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "EditCourse",
        path: PATH_EDIT_COURSE + "/:id",
        element: <CoursesEdit />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "addCourse",
        path: PATH_ADD_COURSE,
        element: <CoursesAdd />,
      },
    ],
  }
];

export default routes;
