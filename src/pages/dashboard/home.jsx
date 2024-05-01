import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Chip,
} from "@material-tailwind/react";

import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { UsersIcon, DocumentTextIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";

import { PATH_EDIT_COURSE, PATH_EDIT_CURRICULUM } from "@/path";
import { Link } from "react-router-dom";
import { getUser, getCourse, getCurriculum } from "@/api/getDataAPI";






export function Home() {

  const [dataUser, setDataUser] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataCurriculum, setDataCurriculum] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUser();
      console.log(dataUser);
      setDataUser(dataUser);

      const dataCourse = await getCourse();
      console.log(dataCourse);
      setDataCourse(dataCourse);

      const dataCurriculum = await getCurriculum();
      console.log(dataCurriculum);
      setDataCurriculum(dataCurriculum);
    };
    fetchData();
  }, []);  

  


  const statisticsCardsData = [
    {
      color: "gray",
      icon: UsersIcon,
      title: "Giảng viên",
      value: dataUser.length,
      // footer: {
      //   color: "text-green-500",
      //   value: "+1",
      //   label: "Bắp Hồng Pine (CNTT) (2021-2022)",
      // },
    },
    {
      color: "gray",
      icon: DocumentTextIcon,
      title: "Đề cương môn học",
      value: dataCourse.length,
      // footer: {
      //   color: "text-green-500",
      //   value: "+9",
      //   label: "than last month",
      // },
    },
    {
      color: "gray",
      icon: DocumentDuplicateIcon,
      title: "Giáo trình / Chương trình khung",
      value: dataCurriculum.length,
      // footer: {
      //   color: "text-red-500",
      //   value: "-1",
      //   label: "last year",
      // },
    },
  ];
  



  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            // footer={
            //   <Typography className="font-normal text-blue-gray-600">
            //     <strong className={footer.color}>{footer.value}</strong>
            //     &nbsp;{footer.label}
            //   </Typography>
            // }
          />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Đề cương môn học
              </Typography>
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
                {dataCourse.slice(0, 5).map(
                  ({ name, id_course_main, email, teacher, status, time_update }, key) => {
                    const className = `py-3 px-5 ${key === dataCourse.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={id_course_main}>
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
                            {
                              teacher.map((teacherId, index) => {
                                let teacherName = "";
                                for (let i = 0; i < dataUser.length; i++) {
                                  if (teacherId === dataUser[i].id_user) {
                                    teacherName = dataUser[i].first_name + " " + dataUser[i].last_name;
                                    break; // Thoát khỏi vòng lặp khi tìm thấy giáo viên tương ứng
                                  }
                                }
                                
                                // Kiểm tra xem đã là giáo viên cuối cùng chưa
                                const isLastTeacher = index === teacher.length - 1;

                                return (
                                  <span key={index}>
                                    {teacherName}
                                    {isLastTeacher ? "" : ", "}
                                  </span>
                                );
                              })
                            }
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
                            {time_update}
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
                                <Link
                                  to={"/dashboard" + PATH_EDIT_COURSE}
                                  className="text-xs font-semibold text-blue-gray-600 bg-blue-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                >
                                  Xuất file word
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to={"/dashboard" + PATH_EDIT_COURSE + "/" + id_course_main}
                                  className="text-xs font-semibold text-blue-gray-600 bg-green-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                >
                                  Chỉnh sửa
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to={'#'}
                                  className="text-xs font-semibold text-blue-gray-600 bg-red-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                >
                                  Xóa
                                </Link>
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

        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Giảng viên
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  {["Tên Giảng viên", "Khoa", "Gmail"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {dataUser.map(
                  ({ first_name, last_name, id_user, education, department, gmail }, key) => {
                    const className = `py-3 px-5 ${key === dataUser.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={id_user}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {first_name + " " + last_name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {/* {education} */}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {department}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {gmail}
                          </Typography>
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

      <div className="mb-12 grid">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6 flex items-center justify-between">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Giáo trình / Chương trình khung
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Tên chương trình", "Khóa", "Công bố", "Năm", ""].map((el) => (
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
                {dataCurriculum.slice(0, 5).map(
                  ({ name, id_curriculum, grade, status, year }, key) => {
                    const className = `py-3 px-5 ${key === dataCurriculum.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={id_curriculum}>
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
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {id_curriculum}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {grade}
                              </Typography>
                            </div>
                          </div>
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
                            {year}
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
                                <Link
                                  to={"/dashboard" + PATH_EDIT_CURRICULUM}
                                  className="text-xs font-semibold text-blue-gray-600 bg-blue-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                >
                                  Xuất file word
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to={"/dashboard" + PATH_EDIT_CURRICULUM + "/" + id_curriculum}
                                  className="text-xs font-semibold text-blue-gray-600 bg-green-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                >
                                  Chỉnh sửa
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link
                                  to={'#'}
                                  className="text-xs font-semibold text-blue-gray-600 bg-red-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                >
                                  Xóa
                                </Link>
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
    </div>
  );
}

export default Home;
