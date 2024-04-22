import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Input,
  Chip,
  Tooltip,
  Progress,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { courseData } from "@/data";
import { PATH_EDIT_COURSE, PATH_ADD_COURSE } from "@/path";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { MinusIcon } from "@heroicons/react/24/solid";


export function CoursesEdit() {

  // 1
  const [title, setTitle] = useState("Nhập tên học phần");
  const [courseId, setCourseId] = useState("Nhập mã học phần");

  // 2
  const [creditPractical, setCreditPractical] = useState(0);
  const [creditTheory, setCreditTheory] = useState(0);
  const [creditSelfStudy, setCreditSelfStudy] = useState(0);

  // 3


  // 4
  const [des, setDes] = useState("Nhập tài liệu học tập");


  // 6
  const rowCDR = [
    {
      id: 0,
      value: {
        clo: 1,
        content: '',
        soPerPi: '',
      },
      className: '',
    },
  ];
  const [tableRowCDR, setTableRowCDR] = useState(rowCDR);
  const addTableRowCDR = () => {
    setTableRowCDR((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: idx,
          value: {
            clo: r.length + 1,
            content: '',
            soPerPi: '',
          },
          className: '',
        },
      ];
    });
  };
  const deleteTableRowsCDR = (index) => {
    const rows = [...tableRowCDR];
    rows.splice(index, 1);
    setTableRowCDR(rows);
  };

  const handleTableRowsCDR = (index, key, value) => {
    setTableRowCDR((prev) => {
      prev[index].value[key] = value;
      return prev;
    });
  };

  // 7 
  const rowKHGD = [
    {
      id: 0,
      value: {
        order: 1,
        content: '',
        nLessons: 0,
        clos: '',
        method: '',
        bonus: '',
      },
      className: '',
    },
  ];
  const [tableRowKHGD, setTableRowKHGD] = useState(rowKHGD);
  const addTableRowKHGD = () => {
    setTableRowKHGD((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: idx,
          value: {
            order: idx,
            content: '',
            nLessons: 0,
            clos: '',
            method: '',
            bonus: '',
          },
          className: '',
        },
      ];
    });
  };
  const deleteTableRowsKHGD = (index) => {
    const rows = [...tableRowKHGD];
    rows.splice(index, 1);
    setTableRowKHGD(rows);
  };

  const handleTableRowsKHGD = (index, key, value) => {
    setTableRowKHGD((prev) => {
      prev[index].value[key] = value;
      return prev;
    });
  };


  // 8
  const rowPPDG = [
    {
      id: 0,
      value: {
        order: 1,
        clo: 0,
        test: '',
        method: '',
        proportion: 0,
        target: 0,
      },
      className: '',
    },
  ];
  const [tableRowPPDG, setTableRowPPDG] = useState(rowPPDG);
  const addTableRowPPDG = () => {
    setTableRowPPDG((r) => {
      let idx = r[r.length - 1].id + 1;

      return [
        ...r,
        {
          id: idx,
          value: {
            order: idx,
            clo: 0,
            test: '',
            method: '',
            proportion: 0,
            target: 0,
          },
          className: '',
        },
      ];
    });
  };

  const deleteTableRowsPPDG = (index) => {
    const newTableRowsPPDG = [...tableRowPPDG];
    newTableRowsPPDG.splice(index, 1);
    setTableRowPPDG(newTableRowsPPDG);
    console.log(newTableRowsPPDG);
  };

  const handleTableRowsPPDG = (index, key, value) => {
    setTableRowPPDG((prev) => {
      prev[index].value[key] = value;

      return prev;
    });
  };

  const rowTPDG = [
    {
      id: 0,
      value: {
        order: 1,
        name: '',
        method: '',
        proportion: 0,
      },
      className: '',
    },
  ];
  const [tableRowTPDG, setTableRowTPDG] = useState(rowTPDG);
  const addTableRowTPDG = () => {
    setTableRowTPDG((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: idx,
          value: {
            order: idx,
            name: '',
            method: '',
            proportion: 0,
          },
          className: '',
        },
      ];
    });
  };
  const deleteTableRowsTPDG = (index) => {
    const rows = [...tableRowTPDG];
    rows.splice(index, 1);
    setTableRowTPDG(rows);
  };

  const handleTableRowsTPDG = (index, key, value) => {
    setTableRowTPDG((prev) => {
      prev[index].value[key] = value;
      return prev;
    });
  };

  const data = {
    // title : "nhap ten hoc phan",
    // courseId : "432302",
  }




  const handleSave = () => {
    const course = {
      title: title,
      courseId: courseId,
      creditPractical: creditPractical,
      creditTheory: creditTheory,
      creditSelfStudy: creditSelfStudy,
      // lecturers: lecturers,
      des,
    }

    console.log(course)

  }



  return (
    <div className="mt-8 mb-8 gap-12 bg-white min-h-[100vh] border border-blue-gray-100 shadow-sm rounded-xl p-4">
      <h2 className="font-bold flex justify-center text-2xl">MẪU ĐỀ CƯƠNG CHI TIẾT MÔN HỌC</h2>
      <h2 className="font-bold flex justify-center text-xl">ĐỀ CƯƠNG HỌC PHẦN</h2>
      {/* 1 */}
      <h4 className="font-bold">1. Tên và mã học phần</h4>
      <div className="flex mb-[5rem]">
        <ReactQuill
          className="flex-1"
          value={data?.title || title}
          onChange={setTitle}
        />
        <ReactQuill
          className="flex-1"
          value={data?.courseId || courseId}
          onChange={setCourseId}
        />
      </div>
      {/* 2 */}
      <h4 className="font-bold">2. Số tín chỉ</h4>
      <div className="flex mb-[2rem] justify-between flex-wrap gap-5">
        <div className="flex">
          <Typography variant="span" color="blue-gray" className="min-w-[80px] block">
            Thực hành
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 h-[30px] w-[80px]"
            type="number"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            min={0}
            onChange={(e) => setCreditPractical(Number(e.target.value))}
          />
        </div>
        <div className="flex">
          <Typography variant="span" color="blue-gray" className="min-w-[80px] block">
            Lý thuyết
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 h-[30px] w-[80px]"
            type="number"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            min={0}
            onChange={(e) => setCreditTheory(Number(e.target.value))}
          />
        </div>
        <div className="flex">
          <Typography variant="span" color="blue-gray" className="min-w-[80px] block">
            Tự học
          </Typography>
          <Input
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 h-[30px] w-[80px]"
            type="number"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            min={0}
            onChange={(e) => setCreditSelfStudy(Number(e.target.value))}
          />
        </div>
        <div className="flex">
          <Typography variant="span" color="blue-gray" className="min-w-[100px] block">
            Tổng tín chỉ
          </Typography>
          <Typography variant="h6" color="blue-gray" className="min-w-[200px] block">
            {creditPractical + creditTheory + creditSelfStudy}
          </Typography>
        </div>
      </div>
      {/* 3 */}
      <h4 className="font-bold">3.	Giảng viên phụ trách</h4>
      <div className="mb-5 bg-[#cccc]">
        Làm ô search để chọn select cho nhiều cái
      </div>
      {/* 4 */}
      <h4 className="font-bold">4.	Tài liệu học tập</h4>
      <div>
        <ReactQuill
          className="flex-1"
          value={des}
          onChange={setDes}
        />
      </div>

      {/* 5 */}
      <h4 className="font-bold">5.	Thông tin về học phần</h4>
      <p>a.	Mục tiêu học phần </p>
      <div className="mb-3">
        <ReactQuill
          className="flex-1"
          value={des}
          onChange={setDes}
        />
      </div>
      <p>b.	Mô tả vắn tắt học phần</p>
      <div className="mb-3">
        <ReactQuill
          className="flex-1"
          value={des}
          onChange={setDes}
        />
      </div>
      <p>c.	Học phần học trước (A), tiên quyết (B), song hành (C)</p>
      <div className="mb-5 bg-[#cccc]">
        Làm ô search để chọn select cho nhiều cái
      </div>

      {/* 6 */}
      <h4 className="font-bold">6.	Chuẩn đầu ra của học phần</h4>
      <p>Khi hoàn thành học phần, người học có khả năng: </p>
      <table className="w-full text-sm ">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-1 border border-gray-400 "
            >
              CLOs
            </th>
            <th
              scope="col"
              className="relative pr-40 border border-gray-400 "
            >
              Chuẩn đầu ra của học phần
            </th>

            <th
              scope="col "
              className="border border-gray-400 "
            >
              SO/PI
            </th>
            <th className="border-none"></th>
          </tr>
        </thead>
        <tbody className="text-sm ">
          {tableRowCDR.map((item, i) => {
            return (
              <tr
                key={`row-${item.id}`}
                id={i}
                className={item.className}
              >
                <td
                  scope="row"
                  className="w-10 font-medium text-center border border-gray-400 "
                >
                  {i + 1}
                </td>
                <td className=" border pt-2 relative w-[800px] border-gray-400  ">
                  <textarea
                    className="w-full break-all"
                    onChange={(e) =>
                      handleTableRowsCDR(
                        i,
                        'content',
                        e.target
                          .value
                      )
                    }
                  ></textarea>
                </td>

                <td className="w-40 pt-2 border border-gray-400 ">
                  <textarea
                    rows="auto"
                    cols="auto"
                    onChange={(e) =>
                      handleTableRowsCDR(
                        i,
                        'soPerPi',
                        e.target
                          .value
                      )
                    }
                  />
                </td>

                <td className="w-10 pl-4">
                  {item.id === 0 ? (
                    <button
                      className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                      onClick={
                        addTableRowCDR
                      }
                    >
                      +
                    </button>
                  ) : (
                    <button
                      className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                      onClick={() =>
                        deleteTableRowsCDR(
                          i
                        )
                      }
                    >
                      -
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Ma trận tích hợp giữa chuẩn đầu ra của học phần và chuẩn đầu ra của chương trình đào tạo. </p>

      {/* 7 */}
      <h4 className="font-bold">7.	Nội dung học phần và kế hoạch giảng dạy</h4>
      <div className="mb-5">
        <table className="w-full text-sm">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-1 border border-gray-400 "
              >
                STT
              </th>

              <th
                scope="col "
                className="border border-gray-400 "
              >
                Nội dung giảng dạy
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Số tiết
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                CLOs
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Phương pháp dạy
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Nội dung và hướng dẫn tự học
              </th>
            </tr>
          </thead>
          <tbody className="text-sm ">
            {tableRowKHGD.map((item, i) => {
              return (
                <tr
                  id={i}
                  key={`row-${item.id}`}
                  className={item.className}
                >
                  <th
                    scope="row"
                    className="w-10 font-medium border border-gray-400"
                  >
                    {i + 1}
                  </th>
                  <td className="relative break-all border border-gray-400 w-96">
                    <ReactQuill
                      theme="snow"
                      onChange={(e) =>
                        handleTableRowsKHGD(
                          i,
                          'content',
                          e
                        )
                      }
                    />
                  </td>
                  <td className="relative w-12 p-2 break-all border border-gray-400">
                    <input
                      type="number"
                      min={0}
                      defaultValue={0}
                      className="w-10 text-center border-b-2 focus:outline-none"
                      onChange={(e) =>
                        handleTableRowsKHGD(
                          i,
                          'nLessons',
                          e.target
                            .value
                        )
                      }
                    />
                  </td>
                  <td className="relative w-24 p-2 break-all border border-gray-400">
                    <input
                      type="text"
                      className="w-full border-b-2 focus:outline-none"
                      onChange={(e) =>
                        handleTableRowsKHGD(
                          i,
                          'clos',
                          e.target
                            .value
                        )
                      }
                    />
                  </td>
                  <td className="relative w-40 p-2 break-all border border-gray-400">
                    <input
                      type="text"
                      className="w-full border-b-2 focus:outline-none"
                      onChange={(e) =>
                        handleTableRowsKHGD(
                          i,
                          'method',
                          e.target
                            .value
                        )
                      }
                    />
                  </td>
                  <td className="p-2 break-all border border-gray-400 w-72">
                    <ReactQuill
                      theme="snow"
                      onChange={(e) =>
                        handleTableRowsKHGD(
                          i,
                          'bonus',
                          e
                        )
                      }
                    />
                  </td>
                  <td className="w-10 pl-4">
                    {item.id === 0 ? (
                      <button
                        className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                        onClick={
                          addTableRowKHGD
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                        onClick={() =>
                          deleteTableRowsKHGD(
                            i
                          )
                        }
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 8 */}
      <h4 className="font-bold">8.	Phương pháp đánh giá</h4>
      <p>a. Phương pháp đánh giá các chuẩn đầu ra của học phần</p>
      <div className="mb-5">
        <table className="w-full text-sm ">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-1 border border-gray-400 "
              >
                CLOs
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Bài kiểm tra
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Phương pháp đánh giá
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Tỉ trọng (%)
              </th>
              <th
                scope="col "
                className="border border-gray-400 "
              >
                Chỉ tiêu (%)
              </th>
            </tr>
          </thead>
          <tbody className="text-sm ">
            {tableRowPPDG.map((item, i) => {
              return (
                <tr
                  key={`row-${item.id}`}
                  id={i}
                  className={item.className}
                >
                  <th
                    scope="row"
                    className="w-10 p-2 font-medium border border-gray-400"
                  >
                    <input
                      type="number"
                      className="w-full text-center border-b-2 focus:outline-none"
                      min={0}
                      defaultValue={0}
                      onChange={(e) => {
                        // console.log(item.id);
                        handleTableRowsPPDG(
                          i,
                          'clo',
                          Number(
                            e.target
                              .value
                          )
                        );
                      }}
                    />
                  </th>
                  <td className="relative p-2 break-all border border-gray-400 w-96">
                    <input
                      type="text"
                      className="w-full border-b-2 focus:outline-none"
                      onChange={(e) =>
                        handleTableRowsPPDG(
                          i,
                          'test',
                          e.target
                            .value
                        )
                      }
                    />
                  </td>
                  <td className="relative break-all border border-gray-400 w-[500px] p-2">
                    <input
                      type="text"
                      className="w-full border-b-2 focus:outline-none"
                      onChange={(e) =>
                        handleTableRowsPPDG(
                          i,
                          'method',
                          e.target
                            .value
                        )
                      }
                    />
                  </td>
                  <td className="relative w-32 p-2 break-all border border-gray-400">
                    <input
                      type="number"
                      className="w-full border-b-2 focus:outline-none"
                      min={0}
                      defaultValue={0}
                      onChange={(e) =>
                        handleTableRowsPPDG(
                          i,
                          'proportion',
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                    />
                  </td>
                  <td className="relative w-32 p-2 break-all border border-gray-400">
                    <input
                      type="number"
                      className="w-full border-b-2 focus:outline-none"
                      min={0}
                      defaultValue={0}
                      onChange={(e) =>
                        handleTableRowsPPDG(
                          i,
                          'target',
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                    />
                  </td>
                  <td className="w-10 pl-4">
                    {i === 0 ? (
                      <button
                        className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                        onClick={
                          addTableRowPPDG
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                        onClick={() => {
                          console.log(
                            'Dong thu',
                            i
                          );
                          deleteTableRowsPPDG(
                            i
                          );
                          // console.log(tableRowPPDG);
                        }}
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>b.Các thành phần đánh giá</p>
      <div className="mb-5">
        <table className="w-full text-sm ">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-1 border border-gray-400 "
              >
                Phương pháp
              </th>

              <th
                scope="col "
                className="border border-gray-400 "
              >
                Phương pháp đánh giá
              </th>

              <th
                scope="col "
                className="border border-gray-400 "
              >
                Tỉ trọng (%)
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tableRowTPDG.map((item, i) => {
              return (
                <tr
                  id={i}
                  key={`row-${item.id}`}
                  className={item.className}
                >
                  <th
                    scope="row"
                    className="p-2 font-medium border border-gray-400 w-82"
                  >
                    <textarea
                      type="text"
                      className="w-full"
                      onChange={(e) =>
                        handleTableRowsTPDG(
                          i,
                          'name',
                          e.target
                            .value
                        )
                      }
                    ></textarea>
                  </th>
                  <td className="relative break-all border border-gray-400 w-[510px] p-2">
                    <ReactQuill
                      theme="snow"
                      onChange={(e) =>
                        handleTableRowsTPDG(
                          i,
                          'method',
                          e
                        )
                      }
                    />
                  </td>
                  <td className="relative w-24 p-2 break-all border border-gray-400">
                    <input
                      type="number"
                      className="w-full border-b-2 focus:outline-none "
                      min={0}
                      onChange={(e) =>
                        handleTableRowsTPDG(
                          i,
                          'proportion',
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                    />
                  </td>

                  <td className="w-10 pl-4">
                    {item.id === 0 ? (
                      <button
                        className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                        onClick={
                          addTableRowTPDG
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                        onClick={() =>
                          deleteTableRowsTPDG(
                            i
                          )
                        }
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>-	Thang điểm đánh giá: Theo học chế tín chỉ.</p>

      {/* 10 */}
      <h4 className="font-bold">Ngày biên soạn</h4>
      <div className="mb-5">
        <input type="date" />
      </div>

      {/* 11 */}
      <h4 className="font-bold">Trưởng bộ môn: </h4>
      <div className="mb-5">
        <div className="mb-5 bg-[#cccc]">
          Làm ô search để chọn select cho nhiều cái
        </div>
      </div>

      {/* 12 */}
      <h4 className="font-bold">Trưởng/phó khoa phụ trách:</h4>
      <div className="mb-5">
        <div className="mb-5 bg-[#cccc]">
          Làm ô search để chọn select cho nhiều cái
        </div>
      </div>



      {/* button */}

      <div className="flex justify-center mt-10 border-t-2 gap-10">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Lưu
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Xuất file
        </button>

      </div>
    </div>
  );
}

export default CoursesEdit;
