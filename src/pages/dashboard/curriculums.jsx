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
import { curriculumData, projectsTableData } from "@/data";
import { PATH_EDIT_CURRICULUM, PATH_ADD_CURRICULUM } from "@/path";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurriculum } from "@/api/getDataAPI";
import { Dialog, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react"; 


export function Curriculums() {
  const [dataCurriculum, setDataCurriculum] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [openChild, setOpenChild] = useState(false);

  const handleOpenChild = () => setOpenChild(!openChild);



  useEffect(() => {
    const getData = async () => {
      try {
        const dataCurriculum = await getCurriculum();
        setDataCurriculum(dataCurriculum);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }
    , []);



  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between">
            <Typography variant="h6" color="white">
              Giáo trình / Chương trình khung
            </Typography>
            <IconButton onClick={handleOpen} variant="text" color="white">
              <PlusIcon className="h-6 w-6" />
            </IconButton>
            <Dialog open={open} handler={handleOpen}>
              <DialogFooter className="flex justify-between">
                <Button variant="gradient" onClick={handleOpenChild}>
                  <span>Dựa trên đề cương có sẵn </span>
                </Button>
                <Dialog open={openChild} handler={handleOpenChild} className="max-h-[800px] overflow-auto">
                  <DialogBody className="flex justify-between flex-col">
                    <Input
                      type="text"
                      color="lightBlue"
                      size="regular"
                      outline={true}
                      placeholder="Tìm kiếm đề cương"
                    />
                    <table className="w-full min-w-[640px] table-auto">
                      <thead>
                        <tr>
                          {["Tên chương trình", "Năm", "Sao chép"].map((el) => (
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
                        {dataCurriculum.map(
                          ({ name, id_curriculum, year }, key) => {
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
                                    </div>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    {year}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Link 
                                    to={"/dashboard" + PATH_ADD_CURRICULUM + "/" + id_curriculum}
                                    className="text-xs font-semibold text-blue-gray-600 bg-green-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                                  >
                                    Chọn
                                  </Link>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </DialogBody>
                  <DialogFooter className="">
                    <Button variant="gradient" onClick={handleOpenChild}>
                      <span>Đóng</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
                <Button variant="gradient">
                  <Link to={"/dashboard" + PATH_ADD_CURRICULUM}>
                    <span>Thêm mới</span>
                  </Link>
                </Button>
                <Button variant="gradient" onClick={handleOpen} className="!bg-blue-500">
                  <span>Hủy</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="mx-4 mb-5">
                <div className="flex items-center gap-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    Tìm kiếm chương trình
                  </Typography>
                </div>
                <Input
                  type="text"
                  outline={true}
                  placeholder="Tìm kiếm"
                />
              </div>
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
                              {/* <Link
                                to={"/dashboard" + PATH_EDIT_CURRICULUM}
                                className="text-xs font-semibold text-blue-gray-600 bg-blue-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                              >
                                Xuất file word
                              </Link> */}
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
  );
}

export default Curriculums;
