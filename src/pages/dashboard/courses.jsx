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


export function Courses() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between">
            <Typography variant="h6" color="white">
              Đề cương môn học
            </Typography>
            <IconButton size="sm" variant="text" color="white">
              <Link to={"/dashboard"+PATH_ADD_COURSE}>
                <PlusIcon className="h-6 w-6" />
              </Link>
            </IconButton>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Tên môn học", "Giảng viên", "Công bố", "Năm", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courseData.map(
                ({ name, email, teacher, status, date }, key) => {
                  const className = `py-3 px-5 ${key === courseData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {teacher}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          value={status ? "Đã công bố" : "Chưa công bố"}
                          className="py-1 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={`flex flex-col gap-2 ${className}`}>
                      <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton size="sm" variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-6 w-6"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                          <MenuItem>
                              <Typography
                                as="a"
                                href={"/dashboard" + PATH_EDIT_COURSE}
                                className="text-xs font-semibold text-blue-gray-600 bg-green-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                              >
                                Xuất file word
                              </Typography>
                            </MenuItem>
                            <MenuItem>
                              <Typography
                                as="a"
                                href={"/dashboard" + PATH_EDIT_COURSE}
                                className="text-xs font-semibold text-blue-gray-600 bg-green-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                              >
                                Chỉnh sửa
                              </Typography>
                            </MenuItem>
                            <MenuItem>
                              <Typography
                                as="a"
                                href={'#'}
                                className="text-xs font-semibold text-blue-gray-600 bg-red-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                              >
                                Xóa
                              </Typography>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Courses;
