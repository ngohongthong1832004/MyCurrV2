import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";
  import { courseData } from "@/data";
  import { PATH_EDIT_COURSE, PATH_ADD_COURSE } from "@/path";
  import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
  import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  
  
  export function CoursesEdit() {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        edit course 323
      </div>
    );
  }
  
  export default CoursesEdit;
  