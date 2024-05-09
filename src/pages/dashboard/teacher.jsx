import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData } from "@/data";
import { useEffect, useState } from "react";
import { getUser } from "@/api/getDataAPI";
import { debounce } from "lodash";
import { searchUserAPI } from "@/api/searchDataAPI";

export function Teacher() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUser();
      // console.log(dataUser);
      setDataUser(dataUser);
    };
    fetchData();
  }, []);



  const handleSearch = async (e) => {
    const param =  {
      search_text : e.target.value
    }

    const filter = await searchUserAPI(param);
    setDataUser(filter);
  }


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Giảng viên
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="mx-4 mb-5">
            <div className="flex items-center gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                Tìm kiếm giảng viên
              </Typography>
            </div>
            <Input
              type="text"
              onChange={debounce(handleSearch, 500)}
              outline={true}
              placeholder="Tìm kiếm"
            />
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Giảng viên", "Gmail", "Trình độ", "Khoa"].map((el) => (
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
              {dataUser.map(
                ({ first_name, last_name, name, gmail, education, department }, key) => {
                  const className = `py-3 px-5 ${key === dataUser.length - 1
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
                              {first_name} {last_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {gmail}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {education}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {department}
                        </Typography>
                      </td>
                      {/* <td className={`flex flex-col gap-2 ${className}`}>
                        <Typography
                          as="a"
                          href={`curriculums/edit/3`}
                          className="text-xs font-semibold text-blue-gray-600 bg-green-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                        >
                          Chỉnh sửa
                        </Typography>
                        <Typography
                          as="a"
                          href={`curriculums/delete/3`}
                          className="text-xs font-semibold text-blue-gray-600 bg-red-500 px-2 py-1 rounded-md text-white flex items-center justify-center"
                        >
                          Xóa
                        </Typography>
                      </td> */}
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

export default Teacher;
