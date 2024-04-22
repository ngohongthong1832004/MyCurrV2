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
  const [semester, setSemester] = useState(0);
  const [department, setDepartment] = useState("");
  const [note, setNote] = useState("");



  const [title, setTitle] = useState("Nhập tên học phần");
  const [courseId, setCourseId] = useState("Nhập mã học phần");


  const data = {
    // title : "nhap ten hoc phan",
    // courseId : "432302",
  }





  console.log(courseId)

  return (
    <div className="mt-8 mb-8 gap-12 bg-white min-h-[100vh] border border-blue-gray-100 shadow-sm rounded-xl p-4">
      {isEdit ? <div>
        <button 
          onClick={() => setIsEdit(false)}
        >Tạo lại</button>
        <h2 className="font-bold flex justify-center text-2xl">KẾ HOẠCH ĐẠO TẠO</h2>
        <h4 className="font-bold flex ">TÊN NGÀNH ĐÀO TẠO: {nameCurriculum}</h4>
        <h4 className="font-bold flex ">KHOA: {department}</h4>
      </div> :
          <div class="relative p-4 w-full max-h-full">
            <div class="relative dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Tạo chương trình
                </h3>
              </div>
              <div class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                  <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chương trình</label>
                    <input 
                      onChange={(e) => setNameCurriculum(e.target.value)}
                      value={nameCurriculum}
                      type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Viết tên chương trình" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số kì</label>
                    <input 
                      onChange={(e) => setSemester(e.target.value)}
                      value={semester}
                      type="number" 
                      name="price" 
                      id="price" 
                      placeholder="9" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    />
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Khoa</label>
                    <select 
                      onChange={(e) => setDepartment(e.target.value)}
                      id="category" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Công nghệ thông tin</option>
                      <option value="TV">Ngoại ngữ</option>
                      <option value="PC">Cơ khí</option>
                      <option value="GA">May mặc</option>
                      <option value="PH">Kinh tế</option>
                    </select>
                  </div>
                  <div class="col-span-2">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
                    <textarea 
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                      id="description" 
                      rows="4" 
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Viết nhưng yêu cầu thêm"></textarea>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEdit(true)}
                  class="w-full flex justify-center text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
