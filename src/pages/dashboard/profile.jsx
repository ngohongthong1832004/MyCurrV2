import { PATH_SIGN_UP } from "@/path";
import { UserIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {

  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (!userInfo) {
      navigate(PATH_SIGN_UP);
    }

    setUser(userInfo);
  }, []);



  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <UserIcon className="w-12 h-12 text-blue-gray-500" />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user.email}
                </Typography>
                {/* <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  2021
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  17521274
                </Typography> */}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
