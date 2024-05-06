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
  // Select,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { courseData } from "@/data";
import { PATH_EDIT_COURSE, PATH_ADD_COURSE } from "@/path";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { MinusIcon } from "@heroicons/react/24/solid";
import { CreateCourse } from "@/api/postDataAPI";
import { Select } from 'antd';
import { getCourse, getUser } from "@/api/getDataAPI";


export function CoursesAdd() {

  const [dataUser, setDataUser] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataCurriculum, setDataCurriculum] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUser();
      setDataUser(dataUser);

      const dataCourse = await getCourse();
      console.log(dataCourse);
      setDataCourse(dataCourse);

    };
    fetchData();
  }, []);





  // 1
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [idCourse, setIdCourse] = useState("")

  console.log(courseId);

  const handleChangeId = (content, delta, source, editor) => {
    setCourseId(content);
    const id = editor.getText();
    setIdCourse(id);
  };


  // 2
  const [creditPractical, setCreditPractical] = useState(0);
  const [creditTheory, setCreditTheory] = useState(0);
  const [creditSelfStudy, setCreditSelfStudy] = useState(0);

  // 3
  const [teacher, setTeacher] = useState([]);

  // 4
  const [des, setDes] = useState("");

  // 5
  const [infoDes1, setInfoDes1] = useState("");
  const [infoDes2, setInfoDes2] = useState("");
  const [subject_similar, setSubject_similar] = useState([]);
  const [subject_pre, setSubject_pre] = useState([]);


  // 6
  const rowCLOs1 = [
    {
      id: 0,
      value: {
        content: '',
        PLO: '',
      },
      className: '',
    },
  ];
  const [tableRowCLOs1, setTableRowCLOs1] = useState(rowCLOs1);
  const addTableRowCLOs1 = () => {
    setTableRowCLOs1((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: idx,
          value: {
            content: '',
            PLO: '',
          },
          className: '',
        },
      ];
    });
  };
  const deleteTableRowsCLOs1 = (index) => {
    const rows = [...tableRowCLOs1];
    rows.splice(index, 1);
    setTableRowCLOs1(rows);
  };

  const handleTableRowsCLOs1 = (index, key, value) => {
    setTableRowCLOs1((prev) => {
      prev[index].value[key] = value;
      return prev;
    });
  };


  const rowCLOs2 = [
    {
      id: 0,
      value: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
      },
      className: '',
    },
  ];
  const [tableRowCLOs2, setTableRowCLOs2] = useState(rowCLOs2);

  const addTableRowCLOs2 = () => {
    setTableRowCLOs2((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: idx,
          value: {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: 0,
            h: 0,
          },
          className: '',
        },
      ];
    });
  };
  const deleteTableRowsCLOs2 = (index) => {
    const rows = [...tableRowCLOs2];
    rows.splice(index, 1);
    setTableRowCLOs2(rows);
  };

  const handleTableRowsCLOs2 = (index, key, value) => {
    const newTableRowsCLOs2 = [...tableRowCLOs2];
    newTableRowsCLOs2[index].value[key] = value;
    setTableRowCLOs2(newTableRowsCLOs2);
  };

  // 7 
  const rowContent = [
    {
      id: 0,
      value: {
        order: 1,
        exam: '',
        method: '',
        point: '',
        criteria: '',
      },
      className: '',
    },
  ];
  const [tableRowContent, setTableRowContent] = useState(rowContent);
  const addTableRowContent = () => {
    setTableRowContent((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: idx,
          value: {
            order: idx,
            exam: '',
            method: '',
            point: '',
            criteria: '',
          },
          className: '',
        },
      ];
    });
  };
  const deleteTableRowsKHGD = (index) => {
    const rows = [...tableRowContent];
    rows.splice(index, 1);
    setTableRowContent(rows);
  };

  const handleTableRowsKHGD = (index, key, value) => {
    setTableRowContent((prev) => {
      prev[index].value[key] = value;
      return prev;
    });
  };


  // 8
  const rowCLOs3 = [
    {
      id: 0,
      value: {
        order: 1,
        exam: 0,
        method: '',
        point: 0,
        criteria: 0,
      },
      className: '',
    },
  ];
  const [tableRowCLOs3, setTableRowCLOs3] = useState(rowCLOs3);
  const addTableRowCLOs3 = () => {
    setTableRowCLOs3((r) => {
      let idx = r[r.length - 1].id + 1;

      return [
        ...r,
        {
          id: idx,
          value: {
            order: idx,
            exam: 0,
            method: '',
            point: 0,
            criteria: 0,
          },
          className: '',
        },
      ];
    });
  };

  const deleteTableRowsCLOs3 = (index) => {
    const newTableRowsCLOs3 = [...tableRowCLOs3];
    newTableRowsCLOs3.splice(index, 1);
    setTableRowCLOs3(newTableRowsCLOs3);
  };

  const handleTableRowsCLOs3 = (index, key, value) => {
    setTableRowCLOs3((prev) => {
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



  // primary teacher
  const [primaryTeacher, setPrimaryTeacher] = useState([]);

  // head department
  const [headDepartment, setHeadDepartment] = useState([]);



  const handleSave = () => {

    const param = {
      id_course_main: idCourse.replace(/\s/g, ''),
      name: title,
      title: title,
      number_credit: creditPractical + ', ' + creditTheory + ', ' + creditSelfStudy + ", " + (creditPractical + creditTheory + creditSelfStudy),
      document: des,
      target: infoDes1,
      description: infoDes2,
      subject_similar: subject_similar.map(e => { return { id: e, name: e } }),
      subject_pre: subject_pre.map(e => { return { id: e, name: e } }),
      CLOs1: tableRowCLOs1.map(e => { return { ...e.value, order  : e.id + 1 } }),
      CLOs2: tableRowCLOs2.map(e => { return { ...e.value, order  : e.id + 1 } }),
      CLOs3: tableRowCLOs3.map(e => { return { ...e.value} }),
      content: tableRowContent.map(e => { return { ...e.value} }),
      time_update: new Date().toISOString(),
      primary_teacher_ids: primaryTeacher,
      head_department_ids: headDepartment,
      teachers_ids: teacher
    }

    const data = CreateCourse(param);

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
          value={title}
          onChange={setTitle}
          placeholder="Nhập tên học phần"
        />
        <ReactQuill
          type="number"
          className="flex-1"
          value={courseId}
          placeholder="Nhập mã học phần"
          onChange={handleChangeId}
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
      <div className="mb-5">
        <Select
          className="mt-2"
          mode="multiple"
          value={teacher}
          style={{ width: '100%' }}
          onChange={setTeacher}
          placeholder="Chọn giáo viên"
          options={dataUser.map(e => ({ label: e.first_name + " " + e.last_name, value: e.id_user }))}
        />
      </div>
      {/* 4 */}
      <h4 className="font-bold">4.	Tài liệu học tập</h4>
      <div>
        <ReactQuill
          className="flex-1"
          value={des}
          onChange={setDes}
          placeholder="Nhập tài liệu học tập"
        />
      </div>

      {/* 5 */}
      <h4 className="font-bold">5.	Thông tin về học phần</h4>
      <p>a.	Mục tiêu học phần </p>
      <div className="mb-3">
        <ReactQuill
          className="flex-1"
          value={infoDes1}
          onChange={setInfoDes1}
          placeholder="Nhập mục tiêu học phần"
        />
      </div>
      <p>b.	Mô tả vắn tắt học phần</p>
      <div className="mb-3">
        <ReactQuill
          className="flex-1"
          value={infoDes2}
          onChange={setInfoDes2}
          placeholder="Nhập mô tả vắn tắt học phần"
        />
      </div>
      <p>c.	Học phần học trước (A), tiên quyết (B), song hành (C)</p>
      <div className="mb-5">
        {/* <p className="my-2">Chọn môn học trước</p>
        <Select
            mode="multiple"
            value={teacher}
            style={{ width: '100%' }}
            onChange={setSubject_similar}
            placeholder="Chọn môn học trước"
            options={dataCourse.map(e => ({ label: e.title?.split("<p>")[1]?.split("</p>")[0] || e.name , value: e.id_course_main }))}
          /> */}

        <p className="my-2">Chọn môn tiên quyết</p>
        <Select
          mode="multiple"
          value={subject_pre}
          style={{ width: '100%' }}
          onChange={setSubject_pre}
          placeholder="Chọn môn học trước"
          options={dataCourse.map(e => ({ label: e.title?.split("<p>")[1]?.split("</p>")[0] || e.name , value: e.id_course_main }))}
        />

        <p className="my-2">Chọn môn song hành</p>
        <Select
          mode="multiple"
          value={subject_similar}
          style={{ width: '100%' }}
          onChange={setSubject_similar}
          placeholder="Chọn môn học trước"
          options={dataCourse.map(e => ({ label: e.title?.split("<p>")[1]?.split("</p>")[0] || e.name , value: e.id_course_main }))}
        />
      </div>

      {/* 6 */}
      <h4 className="font-bold">6.	Chuẩn đầu ra của học phần</h4>
      <p>Khi hoàn thành học phần, người học có khả năng: </p>
      <table className="w-full text-sm mb-8 ">
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
              PLO
            </th>
            <th className="border-none"></th>
          </tr>
        </thead>
        <tbody className="text-sm ">
          {tableRowCLOs1.map((item, i) => {
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
                      handleTableRowsCLOs1(
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
                      handleTableRowsCLOs1(
                        i,
                        'PLO',
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
                        addTableRowCLOs1
                      }
                    >
                      +
                    </button>
                  ) : (
                    <button
                      className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                      onClick={() =>
                        deleteTableRowsCLOs1(
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
      <p className="mb-2">Ma trận tích hợp giữa chuẩn đầu ra của học phần và chuẩn đầu ra của chương trình đào tạo. </p>
      <div className="mb-5">
        <table className="w-full text-sm ">
          <thead>
            <tr>
              <th
                className="border border-gray-400 "
              >
                CLOs
              </th>
              <th
                className="border border-gray-400 "
              >
                a
              </th>
              <th
                className="border border-gray-400 "
              >
                b
              </th>
              <th
                className="border border-gray-400 "
              >
                c
              </th>
              <th
                className="border border-gray-400 "
              >
                d
              </th>
              <th
                className="border border-gray-400 "
              >
                e
              </th>
              <th
                className="border border-gray-400 "
              >
                f
              </th>
              <th
                className="border border-gray-400 "
              >
                g
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tableRowCLOs2.map((item, i) => {
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
                  <td className="relative break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'a', e.target.value)} />
                  </td>
                  <td className="relative  p-2 break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'b', e.target.value)} />
                  </td>
                  <td className="relative p-2 break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'c', e.target.value)} />
                  </td>
                  <td className="relative  p-2 break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'd', e.target.value)} />
                  </td>
                  <td className="p-2 break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'e', e.target.value)} />
                  </td>
                  <td className="p-2 break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'f', e.target.value)} />
                  </td>
                  <td className="p-2 break-all border border-gray-400">
                    <input type="text" className="w-full border-b-2 focus:outline-none" onChange={(e) => handleTableRowsCLOs2(i, 'g', e.target.value)} />
                  </td>
                  <td className="w-10 pl-4">
                    {item.id === 0 ? (
                      <button
                        className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                        onClick={
                          addTableRowCLOs2
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                        onClick={() =>
                          deleteTableRowsCLOs2(
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
            {tableRowContent.map((item, i) => {
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
                          'method',
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
                          'point',
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
                          'criteria',
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
                          addTableRowContent
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
            {tableRowCLOs3.map((item, i) => {
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
                    {/* <input
                      type="number"
                      className="w-full text-center border-b-2 focus:outline-none"
                      min={0}
                      defaultValue={0}
                      onChange={(e) => {
                        handleTableRowsCLOs2(
                          i,
                          'clo',
                          Number(
                            e.target
                              .value
                          )
                        );
                      }}
                    /> */}
                    {i + 1}
                  </th>
                  <td className="relative p-2 break-all border border-gray-400 w-96">
                    <input
                      type="text"
                      className="w-full border-b-2 focus:outline-none"
                      onChange={(e) =>
                        handleTableRowsCLOs3(
                          i,
                          'exam',
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
                        handleTableRowsCLOs3(
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
                        handleTableRowsCLOs3(
                          i,
                          'point',
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
                        handleTableRowsCLOs3(
                          i,
                          'criteria',
                          e.target
                            .value
                        )
                      }
                    />
                  </td>
                  <td className="w-10 pl-4">
                    {i === 0 ? (
                      <button
                        className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                        onClick={
                          addTableRowCLOs3
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                        onClick={() => {
                          deleteTableRowsCLOs3(
                            i
                          );
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
        <div className="mb-5">
          <Select
            mode="multiple"
            value={primaryTeacher}
            style={{ width: '100%' }}
            onChange={setPrimaryTeacher}
            placeholder="Chọn giáo viên"
            options={dataUser.map(e => ({ label: e.first_name + " " + e.last_name, value: e.id_user }))}
          />
        </div>
      </div>

      {/* 12 */}
      <h4 className="font-bold">Trưởng/phó khoa phụ trách:</h4>
      <div className="mb-5">
        <div className="mb-5">
          <Select
            mode="multiple"
            value={headDepartment}
            style={{ width: '100%' }}
            onChange={setHeadDepartment}
            placeholder="Chọn giáo viên"
            options={dataUser.map(e => ({ label: e.first_name + " " + e.last_name, value: e.id_user }))}
          />
        </div>
      </div>



      {/* button */}

      <div className="flex justify-center mt-10 border-t-2 gap-10">
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          Thêm
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

export default CoursesAdd;
