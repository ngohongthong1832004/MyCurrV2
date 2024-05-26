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
import { useState, useEffect } from "react";
import { courseData } from "@/data";
import { PATH_EDIT_COURSE, PATH_ADD_COURSE } from "@/path";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { getCourse, getCurriculum, getCurriculumById, getUser } from "@/api/getDataAPI";
import { Select } from "antd";
import { CreateCurriculum, CreateCurriculumCourse } from "@/api/postDataAPI";
import { number } from "prop-types";
import { putCurriculum } from "@/api/putDataAPI";
import { useLocation } from "react-router-dom";


export function CurriculumsEdit() {
  let { state } = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [nameCurriculum, setNameCurriculum] = useState("");
  const [date, setDate] = useState(0);
  const [department, setDepartment] = useState("");
  const [note, setNote] = useState("");
  const [primaryTeacher, setPrimaryTeacher] = useState([]);

  const [dataUser, setDataUser] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);


  const [initialCurriculum, setInitialCurriculum] = useState()
  const url = window.location.href;
  const lastParam = url.split("/").pop();


  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUser();
      // console.log(dataUser);
      setDataUser(dataUser);
      const dataCourse = await getCourse();
      // console.log(dataCourse);
      setDataCourse(dataCourse);

      const dataCurriculumId = await getCurriculumById(lastParam);
      setInitialCurriculum(dataCurriculumId);
    };
    fetchData();
  }, []);

  const semester = [
    {
      id: 0,
      name: "Học kỳ 1",
      value: [
        {
          id_curriculumCourse: "",
          mandatory: true,
          is_confirm: false,
          semester: 1,
          teacher_ids: [],
          course_ids: []
        },
        {
          id_curriculumCourse: "",
          mandatory: false,
          is_confirm: false,
          semester: 1,
          teacher_ids: [],
          course_ids: []
        }
      ]
    },
  ];
  const [listSemesters, setSemesters] = useState(semester);
  const addSemester = () => {
    setSemesters((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: r.length,
          name: `Học kỳ ${r.length + 1}`,
          value: [
            {
              id_curriculumCourse: "",
              mandatory: true,
              is_confirm: false,
              semester: r.length + 1,
              teacher_ids: [],
              course_ids: []
            },
            {
              id_curriculumCourse: "",
              mandatory: false,
              is_confirm: false,
              semester: r.length + 1,
              teacher_ids: [],
              course_ids: []
            }
          ]
        },
      ];
    });
  };
  const deleteSemester = (index) => {
    const rows = [...listSemesters];
    rows.splice(index, 1);
    setSemesters(rows);
  };
  const handleAddCourse = (data) => {
    setSemesters((r) => {
      let rows = [...r];
      rows[data.index].value[data.key].course_ids = data.data;
      return rows;
    });
  }

  useEffect(() => {
    if (initialCurriculum) {

      console.log(initialCurriculum.curriculum_course);

      setNameCurriculum(initialCurriculum.name);
      setDate(initialCurriculum.year);
      setDepartment(initialCurriculum.department);
      setNote(initialCurriculum.note);
      setPrimaryTeacher(initialCurriculum?.curriculum_course?.[0]?.teacher.map(e => e.id_user));


      const listSemestersEdit = []
      for(let i = 1; i < initialCurriculum.curriculum_course.length; i+=2) {
        listSemestersEdit.push({
          id: initialCurriculum.curriculum_course[i].semester,
          name: `Học kỳ ${initialCurriculum.curriculum_course[i].semester + 1}`,
          value: [
            {
              id_curriculumCourse: initialCurriculum.curriculum_course[i].id_curriculumCourse,
              mandatory: initialCurriculum.curriculum_course[i].mandatory,
              is_confirm: initialCurriculum.curriculum_course[i].is_confirm,
              semester: initialCurriculum.curriculum_course[i].semester,
              teacher_ids: initialCurriculum.curriculum_course[i].teacher?.map(e => e.id_user),
              course_ids: initialCurriculum.curriculum_course[i].id_course?.map(e => e.id_course_main)
            },
            {
              id_curriculumCourse: initialCurriculum.curriculum_course[i - 1].id_curriculumCourse,
              mandatory: initialCurriculum.curriculum_course[i - 1].mandatory,
              is_confirm: initialCurriculum.curriculum_course[i - 1].is_confirm,
              semester: initialCurriculum.curriculum_course[i - 1].semester,
              teacher_ids: initialCurriculum.curriculum_course[i - 1].teacher?.map(e => e.id_user),
              course_ids: initialCurriculum.curriculum_course[i - 1].id_course?.map(e => e.id_course_main)
            }
          ]
        })
      };

      setSemesters(listSemestersEdit);

    }
  }, [initialCurriculum]);


  console.log(listSemesters);



  const handleSave = async() => {
    const listCurrCourseTrue = listSemesters.map((item) => {
      return {
        id_curriculumCourse: (nameCurriculum+ " " + item.name + "_" + Number(item.value[0].mandatory) ).replace(/\s/g, "_"),
        mandatory: item.value[0].mandatory,
        is_confirm: false,
        semester: item.id,
        teacher_ids: primaryTeacher,
        course_ids: item.value[0].course_ids
      }
    }).flat();

    const listCurrCourseFalse = listSemesters.map((item) => {
      return {
        id_curriculumCourse: (nameCurriculum+ " " + item.name + "_" + Number(item.value[1].mandatory) ).replace(/\s/g, "_"),
        mandatory: item.value[1].mandatory,
        is_confirm: false,
        semester: item.id,
        teacher_ids: primaryTeacher,
        course_ids: item.value[1].course_ids
      }
    }).flat();

    const dataCurriculum = {
      id_curriculum: (nameCurriculum + "_" + listSemesters.length + state).replace(/\s/g, "_"),
      name: nameCurriculum,
      year: date,
      curriculum_course_data: [
        ...listCurrCourseTrue,
        ...listCurrCourseFalse
      ],
      department: department,
      note: note,
    }

    if (state) {
      const data = await CreateCurriculum(dataCurriculum);
    } else {
      const data = await putCurriculum(lastParam, dataCurriculum);
    }
      


  }


  return (
    <div className="mt-8 mb-8 gap-12 bg-white min-h-[100vh] border border-blue-gray-100 shadow-sm rounded-xl p-4">
      {isEdit ? <div>
        <button
          className="bg-[#cc0000] text-white rounded-lg px-4 py-2"
          onClick={() => setIsEdit(false)}
        >
          Tạo lại
        </button>
        <h2 className="font-bold flex justify-center text-2xl">KẾ HOẠCH ĐẠO TẠO</h2>
        <h4 className="font-bold flex ">TÊN NGÀNH ĐÀO TẠO: {nameCurriculum}</h4>
        <h4 className="font-bold flex ">KHOA: {department}</h4>
        <h4 className="font-bold flex ">NGÀY TẠO: {date}</h4>

        <table className="w-full text-sm mt-4">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-1 w-[60px]"
              >

              </th>
              <th
                scope="col"
                className="px-1 border border-gray-400 !w-[35px]"
              >
                STT
              </th>
              <th
                scope="col"
                className="border border-gray-400 !w-[120px]"
              >
                Mã môn học
              </th>

              <th
                scope="col "
                className="border border-gray-400 !w-[150px]"
              >
                Tên môn học
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[90px]"
              >
                Tên tiếng Anh
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[120px]"
              >
                Mã học phần
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[40px]"
              >
                Số tín chỉ
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[40px]"
              >
                Mã tự quản
              </th>
              <th
                scope="col "
                className="border border-gray-400"
              >
                Học phần: học trước(a), tiên quyết(b), song hành(c)
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[50px]"
              >
                Số tín chỉ bắt buộc của nhóm
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[50px]"
              >
                TL/BTL
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[45px]"
              >
                Số tiết lý thuyết
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[45px]"
              >
                Số tiết thực hành
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[45px]"
              >
                GK
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[45px]"
              >
                TH
              </th>
              <th
                scope="col "
                className="border border-gray-400 !w-[45px] "
              >
                Thi cuối kỳ
              </th>
              <th className="w-10 pl-4"></th>
            </tr>
          </thead>
        </table>

        <table className="text-sm mt-2 w-full">
          {listSemesters.map((item, index) => {
            return (
              <tr
                key={`row-${item.id}`}
                id={index}
                className="flex flex-col mb-10"
              >
                <div className="w-[100%]">
                  <td
                    scope="row"
                    className="font-medium font-bold text-center text-[#cc0000] min-w-[60px] border border-gray-400 "
                  >
                    {item.name}
                  </td>
                  <td className="w-full border border-gray-400">
                    {
                      // item.value.map((course, index) => {
                      (
                        <div key={index} className={`flex flex-col py-4 px-2 ${index == 1 && "border-t-2"}`}>
                          <p className="text-[#001bcc] font-medium font-bold">
                            {item.value[0]?.mandatory ? "Học phần bắt buộc" : "Học phần tự chọn"}
                          </p>
                          <Select
                            mode="multiple"
                            value={item.value[0]?.course_ids}
                            style={{ width: '100%' }}
                            onChange={data => handleAddCourse({ data, index, key: 0 })}
                            placeholder="Chọn môn học"
                            options={dataCourse.map(e => ({ label: e.title?.split("<p>")[1]?.split("</p>")[0] || e.name, value: e.id_course_main }))}
                          />
                        </div>
                      )
                      // })
                    }
                  </td>
                  <td className="w-10 pl-4">
                    {index === 0 ? (
                      <button
                        className="w-6 h-6 text-center text-green-600 border border-green-600 rounded-lg "
                        onClick={
                          addSemester
                        }
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="w-6 h-6 text-center text-red-600 border border-red-600 rounded-lg "
                        onClick={() =>
                          deleteSemester(
                            index
                          )
                        }
                      >
                        -
                      </button>
                    )}
                  </td>
                </div>

                {item?.value[0]?.course_ids?.map((id, index) => {
                  const currentCourse = dataCourse.find(course => course.id_course_main === id);
                  if (!currentCourse) return null; // Skip if course not found
                  return (
                    <table className="w-full text-sm my-1">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-1 w-[60px]"
                          >

                          </th>
                          <th
                            scope="col"
                            className="px-1 border border-gray-400 !w-[35px]"
                          >
                            {index + 1}
                          </th>
                          <th
                            scope="col"
                            className="border border-gray-400 !w-[120px] truncate"
                          >
                            {currentCourse?.id_course_main?.split("<p>")[1]?.split("</p>")[0] || currentCourse?.id_course_main}
                          </th>

                          <th
                            scope="col "
                            className="border border-gray-400 !w-[150px] truncate"
                          >
                             {currentCourse?.name?.split("<p>")[1]?.split("</p>")[0] || currentCourse?.name}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[90px]"
                          >
                            {/* Tên tiếng Anh */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[120px]"
                          >
                            {currentCourse?.name?.split("<p>")[1]?.split("</p>")[0] || currentCourse?.id_course_main}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[40px]"
                          >
                            {currentCourse?.number_credit.split(", ")[3]}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[40px]"
                          >
                            {/* Mã tự quản */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400"
                          >
                            {
                              currentCourse?.subject_similar?.map((subject, index) => {
                                return <span>{subject.name.split("<p>")[1]?.split("</p>")[0] || subject.name}(a), </span>
                              })
                            }
                            {
                              currentCourse?.subject_pre?.map((subject, index) => {
                                return <span>{subject.name.split("<p>")[1]?.split("</p>")[0] || subject.name}(b), </span>
                              })
                            }
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[50px]"
                          >
                            {/* Số tín chỉ bắt buộc của nhóm */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[50px]"
                          >
                            {/* TL/BTL */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {currentCourse?.number_credit.split(", ")[0]}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {currentCourse?.number_credit.split(", ")[1]}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {/* GK */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {/* TH */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px] "
                          >
                            {/* Thi cuối kỳ */}
                          </th>
                          <th className="w-10 pl-4"></th>
                        </tr>
                      </thead>
                    </table>
                  );
                })}

                <div className="w-[100%]">
                  <td
                    scope="row"
                    className="font-medium font-bold text-center text-[#cc0000] min-w-[60px] border border-gray-400 "
                  >
                    {item.name}
                  </td>
                  <td className="w-full border border-gray-400">
                    {
                      // item.value.map((course, index) => {
                      (
                        <div key={index} className={`flex flex-col py-4 px-2 ${index == 1 && "border-t-2"}`}>
                          <p className="text-[#001bcc] font-medium font-bold">
                            {item.value[1]?.mandatory ? "Học phần bắt buộc" : "Học phần tự chọn"}
                          </p>
                          <Select
                            mode="multiple"
                            value={item.value[1]?.course_ids}
                            style={{ width: '100%' }}
                            onChange={data => handleAddCourse({ data, index, key: 1 })}
                            placeholder="Chọn môn học trước"
                            options={dataCourse.map(e => ({ label: e.title?.split("<p>")[1]?.split("</p>")[0] || e.name, value: e.id_course_main }))}
                          />
                        </div>
                      )
                      // })
                    }
                  </td>
                  <td className="pl-10">

                  </td>
                </div>
                
                {item?.value[1]?.course_ids?.map((id, index) => {
                  const currentCourse = dataCourse.find(course => course.id_course_main === id);
                  if (!currentCourse) return null; // Skip if course not found
                  return (
                    <table className="w-full text-sm my-1">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-1 w-[60px]"
                          >

                          </th>
                          <th
                            scope="col"
                            className="px-1 border border-gray-400 !w-[35px]"
                          >
                            {index + 1}
                          </th>
                          <th
                            scope="col"
                            className="border border-gray-400 !w-[120px] truncate"
                          >
                            {currentCourse?.id_course_main?.split("<p>")[1]?.split("</p>")[0] || currentCourse?.id_course_main}
                          </th>

                          <th
                            scope="col "
                            className="border border-gray-400 !w-[150px] truncate"
                          >
                             {currentCourse?.name?.split("<p>")[1]?.split("</p>")[0] || currentCourse?.name}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[90px]"
                          >
                            {/* Tên tiếng Anh */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[120px]"
                          >
                            {currentCourse?.name?.split("<p>")[1]?.split("</p>")[0] || currentCourse?.id_course_main}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[40px]"
                          >
                            {currentCourse?.number_credit.split(", ")[3]}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[40px]"
                          >
                            {/* Mã tự quản */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400"
                          >
                            {
                              currentCourse?.subject_similar?.map((subject, index) => {
                                return <span>{subject.name.split("<p>")[1]?.split("</p>")[0] || subject.name}(a), </span>
                              })
                            }
                            {
                              currentCourse?.subject_pre?.map((subject, index) => {
                                return <span>{subject.name.split("<p>")[1]?.split("</p>")[0] || subject.name}(b), </span>
                              })
                            }
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[50px]"
                          >
                            {/* Số tín chỉ bắt buộc của nhóm */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[50px]"
                          >
                            {/* TL/BTL */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {currentCourse?.number_credit.split(", ")[0]}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {currentCourse?.number_credit.split(", ")[1]}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {/* GK */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px]"
                          >
                            {/* TH */}
                          </th>
                          <th
                            scope="col "
                            className="border border-gray-400 !w-[45px] "
                          >
                            {/* Thi cuối kỳ */}
                          </th>
                          <th className="w-10 pl-4"></th>
                        </tr>
                      </thead>
                    </table>
                  );
                })}

              </tr>
            );
          })}

        </table>

        <div className="mt-5 w-[100%] flex justify-end">
          <div className="px-10 items-center flex flex-col">
            <p>TP. HCM, {date}</p>
            <Select
              mode="multiple"
              value={primaryTeacher}
              style={{ width: '100%' }}
              onChange={setPrimaryTeacher}
              placeholder="Chọn giáo viên"
              options={dataUser.map(e => ({ label: e.first_name + " " + e.last_name, value: e.id_user }))}
            />
            <input type="text" placeholder="Nhập tên trưởng khoa"></input>
          </div>
        </div>

        {/* button */}

        <div className="flex justify-center mt-10 border-t-2 gap-10">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSave}
          >
            {state ? "Tạo chương trình" : "Cập nhật chương trình"}
          </button>
          {/* <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          // onClick={handleSave}
        >
          Xuất file
        </button> */}

        </div>
        {/* </table> */}


      </div> :
        <div className="relative p-4 w-full max-h-full">
          <div className="relative dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tạo chương trình
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chương trình</label>
                  <input
                    onChange={(e) => setNameCurriculum(e.target.value)}
                    value={nameCurriculum}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Viết tên chương trình"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày tạo / Ngày cập nhật</label>
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    type="date"
                    name="price"
                    id="price"
                    placeholder="9"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Khoa</label>
                  <select
                    onChange={(e) => {
                      // console.log(e.target.value)
                      setDepartment(e.target.value)
                    }}
                    id="category"
                    value={department}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">-- Chọn khoa ---</option>
                    <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                    <option value="Cơ khí">Cơ khí</option>
                    <option value="May mặc">May mặc</option>
                    <option value="Kinh tế">Kinh tế</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
                  <textarea
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Viết nhưng yêu cầu thêm"></textarea>
                </div>
              </div>
              <button
                onClick={() => setIsEdit(true)}
                className="w-full flex justify-center text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <PlusIcon height={20} width={20} className="mr-3" />
                Bắt đầu tạo chương trình
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default CurriculumsEdit;
