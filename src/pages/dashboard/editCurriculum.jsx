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


export function CurriculumsEdit() {

  const [isEdit, setIsEdit] = useState(false);
  const [nameCurriculum, setNameCurriculum] = useState("");
  const [date, setDate] = useState(0);
  const [department, setDepartment] = useState("");
  const [note, setNote] = useState("");



  const [title, setTitle] = useState("Nhập tên học phần");
  const [courseId, setCourseId] = useState("Nhập mã học phần");


  



  const semester = [
    {
      id: 0,
      name: "Học kỳ 1",
      value : [
        {
          id_curriculumCourse : "id_curriculumCourse_test_post",
          mandatory :true,
          is_confirm : false,
          semester : 1,
          teacher_ids : ["t1", "id_gv_kien"],
          course_ids : ["c1", "c2"]
        },
        {
          id_curriculumCourse : "id_curriculumCourse_test_post",
          mandatory :false,
          is_confirm : false,
          semester : 1,
          teacher_ids : ["t1", "id_gv_kien"],
          course_ids : ["c1", "c2"]
        }
      ]
    },
  ];

  const [semesters, setSemesters] = useState(semester);
  const addSemester = () => {
    setSemesters((r) => {
      let idx = r[r.length - 1].id + 1;
      return [
        ...r,
        {
          id: r.length + 1,
          name: `Học kỳ ${r.length + 1}`,
          value : [
            {
              id_curriculumCourse : "id_curriculumCourse_test_post",
              mandatory :true,
              is_confirm : false,
              semester : r.length + 1,
              teacher_ids : ["t1", "id_gv_kien"],
              course_ids : ["c1", "c2"]
            },
            {
              id_curriculumCourse : "id_curriculumCourse_test_post",
              mandatory :false,
              is_confirm : false,
              semester : r.length + 1,
              teacher_ids : ["t1", "id_gv_kien"],
              course_ids : ["c1", "c2"]
            }
          ]
        },
      ];
    });
  };
  const deleteSemester = (index) => {
    const rows = [...semesters];
    rows.splice(index, 1);
    setSemesters(rows);
  };

  const handleSemester = (index, key, value) => {
    setSemesters((prev) => {
      prev[index].value[key] = value;
      return prev;
    });
  };

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
              className="px-1 border border-gray-400 "
            >
              STT
            </th>
            <th
              scope="col"
              className="border border-gray-400 "
            >
              Mã môn học
            </th>

            <th
              scope="col "
              className="border border-gray-400 "
            >
              Tên môn học
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Tên tiếng Anh
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Mã học phần
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Số tín chỉ
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Mã tự quản
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Học phần: học trước(a), tiên quyết(b), song hành(c)
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Số tín chỉ bắt buộc của nhóm
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              TL/BTL
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Số tiết lý thuyết
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Số tiết thực hành
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              GK
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              TH
            </th>
            <th
              scope="col "
              className="border border-gray-400 "
            >
              Thi cuối kỳ
            </th>
            <th className="w-10 pl-4"></th>
          </tr>
        </thead>
        </table>

        <table className="text-sm mt-2 w-full">
          {semesters.map((item, i) => {
            return (
              <tr
                key={`row-${item.id}`}
                id={i}
                className={item.className}
              >
                <td
                  scope="row"
                  className="font-medium font-bold text-center text-[#cc0000] w-[60px] border border-gray-400 "
                >
                  {item.name}
                </td>
                <td className=" border relative border-gray-400">
                  {
                    item.value.map((course, index) => {
                      return (
                        <div key={index} className={`flex flex-col py-4 px-2 ${index == 1 && "border-t-2"}`}>
                          <p className="text-[#001bcc] font-medium font-bold">
                            {course?.mandatory ? "Học phần bắt buộc" : "Học phần tự chọn"}
                          </p>
                          <input className="p-4 bg-[#b6b7bf1a] font-medium" placeholder="Nhập tên môn học"></input>
                        </div>
                      )
                    })
                  }
                </td>
                <td className="w-10 pl-4">
                  {item.id === 0 ? (
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
        </table>

        <div className="mt-5 w-[100%] flex justify-end">
          <div className="px-10 items-center flex flex-col">
            <p>TP. HCM, ngày 06 tháng 05 năm 2022</p>
            <h4 className="font-bold">Trưởng khoa</h4>
            <input type="text" placeholder="Nhập tên trưởng khoa"></input>
          </div>
        </div>

         {/* button */}

       <div className="flex justify-center mt-10 border-t-2 gap-10">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          // onClick={handleSave}
        >
          Lưu
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          // onClick={handleSave}
        >
          Xuất file
        </button>

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
                        console.log(e.target.value)
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
                  <PlusIcon  height={20} width={20} className="mr-3"/>
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
