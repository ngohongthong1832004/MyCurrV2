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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { curriculumData, projectsTableData } from "@/data";

export function Curriculums() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
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
              {curriculumData.map(
                ({ coursesName, coursesId, grade, status, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === curriculumData.length - 1
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
                              {coursesName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {coursesId}
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
                          {date}
                        </Typography>
                      </td>
                      <td className={`flex flex-col gap-2 ${className}`}>
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
